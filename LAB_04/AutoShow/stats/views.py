from django.shortcuts import render
from main.models import Car
from django.db.models import Sum
from datetime import date
from django.db.models import Q
from stats.forms import MonthForm, YearForm

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

def monthly_sales_report(request):
    form = MonthForm(request.GET)
    formY = YearForm(request.GET)

    if formY.is_valid():
        year = formY.cleaned_data['year']
        yearly_sales_data = get_yearly_sales(year)
        cars = Car.objects.all().order_by('brand')

        yearly_sales_total = {}

        for car in cars:
            salesY = yearly_sales_data.get(car.brand + ' ' + car.model, 0)

            if salesY!= None:
                total_sales = salesY * car.cost
            else: total_sales = 0

            yearly_sales_total[car.brand + ' ' + car.model] = total_sales
    else:
        yearly_sales_data = {}
        yearly_sales_total = {}

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
        

    context = {
        'form': form,
        'formY': formY,
        'monthly_sales_data': monthly_sales_data,
        'monthly_sales_total': monthly_sales_total,  
        'yearly_sales_data': yearly_sales_data,
        'yearly_sales_total': yearly_sales_total,  

    }

    return render(request, 'monthly_sales_report.html', context)