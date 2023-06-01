from django.shortcuts import render, get_object_or_404
from .models import *
from django.views.generic import DetailView, CreateView
from django.urls import reverse_lazy
from main.forms import RegisterUserForm
from django.contrib.auth.views import LoginView
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.

def index(request):
 cars  = Car.objects.all()[:1]
 return render(request, 'index.html', context={'cars':cars})

def CarsList(request, car_carcass = None):

  cars  = Car.objects.all()
  carcass_type = None
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
  
  if car_carcass:
       carcass_type = get_object_or_404(CarcassType, designation=car_carcass)
       cars = cars.filter(carcass_type=carcass_type)
       print(carcass_type)
    
  
  return render(request, 'cars.html', {'cars':cars, 'carcass_type':carcass_type,'carcass_types':carcass_types})

class CarDetailView(DetailView):
  model = Car
  template_name = 'car_details.html'

class RegisterUser(CreateView):
   form_class = RegisterUserForm
   template_name = 'register.html'
   success_url = reverse_lazy('login')

class LoginUser(LoginView):
   form_class = AuthenticationForm
   template_name = 'login.html'
   success_url = reverse_lazy('login')