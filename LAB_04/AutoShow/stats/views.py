from django.shortcuts import render
from main.models import Car
from django.db.models import Sum
from datetime import date
from django.db.models import Q, F
from stats.forms import MonthForm, YearForm
from main.models import Client
from order.models import Order
from statistics import mean, median
from collections import Counter
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import pandas as pd


def get_monthly_sales(month):
    monthly_sales_data = Car.objects.order_by('brand').annotate(
        monthly_sales=Sum('order_items__quantity', filter=(
            Q(order_items__order__created__month=month)
        ))
    ).values('brand', 'model', 'monthly_sales')

    monthly_sales_dict = {item['brand'] + ' ' + item['model']: item['monthly_sales'] for item in monthly_sales_data}
    return monthly_sales_dict


def get_yearly_sales(year):
    yearly_sales_data = Car.objects.order_by('brand').annotate(
        yearly_sales=Sum('order_items__quantity', filter=(
            Q(order_items__order__created__year=year)
        ))
    ).values('brand', 'model', 'yearly_sales')

    yearly_sales_dict = {item['brand'] + ' ' + item['model']: item['yearly_sales'] for item in yearly_sales_data}


    return yearly_sales_dict

def report(request):
    form = MonthForm(request.GET)
    formY = YearForm(request.GET)

    if formY.is_valid():
        year = formY.cleaned_data['year']
        yearly_sales_data = get_yearly_sales(year)
        cars = Car.objects.all().order_by('brand')

        yearly_sales_total = {}
        brands = list(yearly_sales_data.keys())
        salesD = list(yearly_sales_data.values())
        prices = []
        for car in cars:
            salesY = yearly_sales_data.get(car.brand + ' ' + car.model, 0)
            prices.append(car.cost)
            if salesY!= None:
                total_sales = salesY * car.cost
            else: total_sales = 0

            yearly_sales_total[car.brand + ' ' + car.model] = total_sales
            max_year_value = max(yearly_sales_total.values())
            key_with_max_value_year = [key for key, value in yearly_sales_total.items() if value == max_year_value]


    else:
        yearly_sales_data = {}
        yearly_sales_total = {}
        max_year_value = 0
        key_with_max_value_year = []
        year = 0
        brands = []
        salesD = []
        prices = []

    if form.is_valid():
        month = form.cleaned_data['month']
        monthly_sales_data = get_monthly_sales(month)
        cars = Car.objects.all().order_by('brand')

        monthly_sales_total = {}

        for car in cars:
            sales = monthly_sales_data.get(car.brand + ' ' + car.model, 0)

            if sales!= None:
                total_sales = sales * car.cost
            else: total_sales = 0

            monthly_sales_total[car.brand + ' ' + car.model] = total_sales
    else:
        monthly_sales_data = {}
        monthly_sales_total = {}

    clients = Client.objects.all().order_by('last_name') 
    client_data = []

    ages = [calculate_age(client.date_of_birth) for client in clients]

    average_age = mean(ages)
    median_age = median(ages)
    for client in clients:
        orders = client.order_set.all()
        total_sales = orders.annotate(
                total_cost=Sum(F('items__quantity') * F('items__price'))
            ).aggregate(total_sales=Sum('total_cost'))['total_sales']
        client_data.append(
            {'client': client, 'orders': orders, 'total_sales': total_sales})
        
    orders = Order.objects.all()
    sales_amounts = [order.get_total_cost() for order in orders]

    data = []

    for order, sale_amount in zip(orders, sales_amounts):
        data.append({
        'order_id': order.id,  
        'sale_amount': sale_amount
    })
        
    df = pd.DataFrame(data)

    plt.hist(df['sale_amount'], bins=10, edgecolor='k')
    plt.xlabel('Сумма продаж')
    plt.ylabel('Количество заказов')
    plt.title('Распределение сумм продаж')

    buffer3 = BytesIO()
    plt.savefig(buffer3, format='png')
    plt.close()

    # Конвертируем изображение в строку base64
    image_base64_hist = base64.b64encode(buffer3.getvalue()).decode('utf-8')

    average_sales =  round(sum(sales_amounts) / len(sales_amounts),1)

    sorted_sales = sorted(sales_amounts)
    n = len(sorted_sales)
    if n % 2 == 0:
        median_sales = (sorted_sales[n // 2 - 1] + sorted_sales[n // 2]) / 2
    else:
        median_sales = sorted_sales[n // 2]

    sales_counts = Counter(sales_amounts)
    mode_sales = max(sales_counts, key=sales_counts.get)

    if mode_sales == 0:
        sales_counts.pop(mode_sales)
        mode_sales = max(sales_counts, key=sales_counts.get)
   
    plt.figure(figsize=(5, 5))
    
    plt.plot(salesD, prices)  
    plt.xlabel('Объем продаж')
    plt.ylabel('Цена')
    plt.title('График зависимости Объема продаж относительно Цен')

    # Преобразование графика в изображение
    buff = BytesIO()
    plt.savefig(buff, format='png')
    buff.seek(0)
    image_data = base64.b64encode(buff.read()).decode('utf-8')

    plt.figure(figsize=(5, 5))
    if not salesD.__contains__(None):
        plt.pie(salesD, labels=brands, autopct='%1.1f%%', startangle=140)
        plt.title('Процент продаж по брендам')

    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()

    context = {
        'form': form,
        'formY': formY,
        'year' : year,
        'monthly_sales_data': monthly_sales_data,
        'monthly_sales_total': monthly_sales_total,  
        'yearly_sales_data': yearly_sales_data,
        'yearly_sales_total': yearly_sales_total,  
        'max_year_value': max_year_value,
        'key_with_max_value_year': key_with_max_value_year,
        'clients': clients,
        'client_data': client_data,
        'average_age': average_age,
        'median_age': median_age,
        'average_sales': average_sales,
        'median_sales': median_sales,
        'mode_sales': mode_sales,
        'image_base64': image_base64,
        'image_data': image_data,
        'image_base64_hist': image_base64_hist,
    }

    return render(request, 'statistics_report.html', context)

from datetime import date

def calculate_age(date_of_birth):
    today = date.today()
    age = today.year - date_of_birth.year - ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))
    return age