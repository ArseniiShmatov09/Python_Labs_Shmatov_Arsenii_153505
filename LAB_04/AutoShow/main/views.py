from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import logout, login
from .models import *
from django.views.generic import DetailView, CreateView
from django.urls import reverse_lazy
from main.forms import RegisterUserForm, LoginUserForm, CarForm, ReviewForm
from django.contrib.auth.views import LoginView
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound
from cart.forms import CartAddCarForm
import requests
from django.contrib.auth.decorators import login_required
from order.models import OrderItem
from django.db.models import Count
from django.db.models.functions import Coalesce
import logging

# Получаем объект логгера для текущего модуля
logger = logging.getLogger(__name__)

def my_view(request):
    logger.debug('Это сообщение с уровнем DEBUG')
    logger.info('Это сообщение с уровнем INFO')
    logger.warning('Это сообщение с уровнем WARNING')
    logger.error('Это сообщение с уровнем ERROR')
    logger.critical('Это сообщение с уровнем CRITICAL')


def js_sandbox(request):
   
    return render(request, 'js_sandbox.html')
                                                   


def get_most_popular_cars():
    popular_cars = (
        OrderItem.objects
        .values('car__id', 'car__model', 'car__brand')
        .annotate(order_count=Count('order'))
        .order_by('-order_count')[:3]
    )
    return popular_cars

def get_least_popular_cars():
    least_popular_cars = (
        OrderItem.objects
        .values('car__id', 'car__model', 'car__brand')
        .annotate(order_count=Count('order'))
        .order_by('order_count')[:3]
    )
    return least_popular_cars


def base_context(request):
    most_popular_cars = get_most_popular_cars()
    least_popular_cars = get_least_popular_cars()
    return {
        'most_popular_cars': most_popular_cars,
        'least_popular_cars': least_popular_cars,
    }

def index(request):
    cars = Car.objects.all()[:2]
    news = News.objects.first()
    joke = requests.get(
        'https://official-joke-api.appspot.com/jokes/random').json()
    dog = requests.get('https://dog.ceo/api/breeds/image/random').json()

    most_popular_cars = get_most_popular_cars()
    least_popular_cars = get_least_popular_cars()
    return render(request, 'index.html', context={'news': news, 'cars': cars,   
                                                  'joke': joke['setup'] + joke['punchline'], 
                                                  'dog': dog['message'], 'least_popular_cars': least_popular_cars, 
                                                  'most_popular_cars': most_popular_cars})
                                                   


def news(request):

    news = News.objects.all()

    return render(request, 'news.html', {'news': news})


@login_required(login_url=reverse_lazy('main:login'))
def promotional_code(request):

    actual_promotional_code = Promotional_code.objects.filter(is_actual=True)
    archive_promotional_code = Promotional_code.objects.filter(is_actual=False)
    return render(request, 'promotional_code.html', {'actual_promotional_code': actual_promotional_code, 'archive_promotional_code': archive_promotional_code})


def reviews(request):
    reviews = Review.objects.all()

    return render(request, 'reviews.html', {'reviews': reviews})


def vacancies(request):

    vacancies = Job.objects.filter(is_actual=True)

    return render(request, 'vacancies.html', {'vacancies': vacancies})


def faq(request):

    faq = FAQ.objects.all()

    return render(request, 'FAQ.html', {'faq': faq})


def contacts(request):

    employee = Employee.objects.all()
    return render(request, 'contacts.html', {'employee': employee})


def privacy_policy(request):

    return render(request, 'privacy_policy.html')


def about(request):

    return render(request, 'about.html')


def CarsList(request):
    cars = Car.objects.all()
    carcass_type = request.GET.get('carcass_type')
    carcass_types = CarcassType.objects.all()
    sort_type_price = request.GET.get('sort_price')
    sort_type_year = request.GET.get('sort_year')

    if str(sort_type_price) == 'ascending':
        cars = cars.order_by('cost')
    elif str(sort_type_price) == 'descending':
        cars = cars.order_by('-cost')

    if str(sort_type_year) == 'ascending':
        cars = cars.order_by('year_of_publication')
    elif str(sort_type_year) == 'descending':
        cars = cars.order_by('-year_of_publication')

    if carcass_type:
        cars = cars.filter(carcass_type__designation=carcass_type)

    return render(request, 'cars.html', {'cars': cars, 'carcass_type': carcass_type, 'carcass_types': carcass_types})


class CarDetailView(DetailView):
    model = Car
    cart_car_form = CartAddCarForm()

    template_name = 'car_details.html'


def car_detail(request, id):
    car = get_object_or_404(Car, id=id)
    cart_car_form = CartAddCarForm()

    return render(request,
                  'car_details.html',
                  {'car': car, 'cart_car_form': cart_car_form})


class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'register.html'
    success_url = reverse_lazy('main:login')

    def form_valid(self, form):
        user = form.save()

        Client.objects.create(first_name=form.cleaned_data['first_name'],
                              last_name=form.cleaned_data['last_name'],
                              date_of_birth=form.cleaned_data['date_birthday'],
                              email=form.cleaned_data['email'],
                              phone_number=form.cleaned_data['phone_number'],
                              town=form.cleaned_data['town']).save()

        login(self.request, user)
        return redirect('main:index')


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'login.html'
    success_url = reverse_lazy('main:login')

    def get_success_url(self):
        return reverse_lazy('main:index')


def logout_user(request):
    logout(request)
    return redirect('main:index')


def car_create(request):

    form = CarForm()

    if request.method == "POST":
        car = Car.objects.create(brand=request.POST.get('brand'),
                                 model=request.POST.get('model'),
                                 description=request.POST.get('description'),
                                 cost=request.POST.get('cost'),
                                 color=request.POST.get('color'),
                                 carcass_type=CarcassType.objects.get(
                                     id=request.POST.get('carcass_type')),
                                 producer=Producer.objects.get(
                                     id=request.POST.get('producer')),
                                 year_of_publication=request.POST.get(
                                     'year_of_publication'),
                                 photo=request.FILES.get('photo')),

    else:
        return render(request, "create_car.html", {"form": form})
    return HttpResponseRedirect("/")


def car_edit(request, id):

    try:
        car = Car.objects.get(id=id)

        form = CarForm(initial={'brand': car.brand, 'model': car.model,
                                'description': car.description, 'cost': car.cost,
                                'color': car.color, 'carcass_type': car.carcass_type,
                                'producer': car.producer, 'year_of_publication': car.year_of_publication,
                                'photo': car.photo})

        if request.method == "POST":
            car.brand = request.POST.get('brand')
            car.model = request.POST.get('model')
            car.description = request.POST.get('description')
            car.cost = request.POST.get('cost')
            car.color = request.POST.get('color')
            car.carcass_type = CarcassType.objects.get(
                id=request.POST.get('carcass_type'))
            car.producer = Producer.objects.get(
                id=request.POST.get('producer'))
            car.year_of_publication = request.POST.get('year_of_publication')
            car.photo = request.FILES.get('photo')
            car.save()
            return HttpResponseRedirect("/")
        else:
            return render(request, "edit_car.html", {"car": car, 'form': form})

    except car.DoesNotExist:
        return HttpResponseNotFound("<h2>Car not found :(</h2>")


def car_delete(request, id):

    try:
        car = Car.objects.get(id=id)
        car.delete()
        return HttpResponseRedirect("/")
    except car.DoesNotExist:
        return HttpResponseNotFound("<h2>car not found</h2>")


@login_required(login_url=reverse_lazy('main:login'))
def create_review(request):

    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = Review.objects.create(text=request.POST.get('text'),
                                           rating=request.POST.get('rating'),
                                           author=request.user.username
                                           ),

            return redirect('main:reviews')

    else:
        form = ReviewForm()
        return render(request, "create_review.html", {"form": form})
    return HttpResponseRedirect("/")
