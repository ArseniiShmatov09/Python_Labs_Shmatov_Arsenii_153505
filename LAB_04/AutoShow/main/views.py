from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import logout, login
from .models import *
from django.views.generic import DetailView, CreateView
from django.urls import reverse_lazy
from main.forms import RegisterUserForm, LoginUserForm, CarForm
from django.contrib.auth.views import LoginView
from django.http import HttpResponseRedirect

# Create your views here.

def index(request):
 cars  = Car.objects.all()[:3]
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

   def form_valid(self, form):
      user = form.save()

      Client.objects.create(first_name=form.cleaned_data['first_name'],
                              last_name=form.cleaned_data['last_name'],
                              date_of_birth=form.cleaned_data['date_birthday'],
                              email=form.cleaned_data['email'],
                              phone_number=form.cleaned_data['phone_number']).save()

        
      login(self.request, user)
      return redirect('index')

class LoginUser(LoginView):
   form_class = LoginUserForm
   template_name = 'login.html'
   success_url = reverse_lazy('login')

   def get_success_url(self):
      return reverse_lazy('index')


def logout_user(request):
   logout(request)
   return redirect('index')

def car_create(request):

    form = CarForm()

    if request.method == "POST":
        car = Car.objects.create(brand = request.POST.get('brand'),
                                 model=request.POST.get('model'),
                                 description=request.POST.get('description'),
                                 cost=request.POST.get('cost'),
                                 color=request.POST.get('color'),
                                 carcass_type=CarcassType.objects.get(id=request.POST.get('carcass_type')),
                                 producer=Producer.objects.get(id=request.POST.get('producer')),
                                 year_of_publication=request.POST.get('year_of_publication'),
                                 photo=request.FILES.get('photo')),

        
    else:
        return render(request, "create_car.html", {"form": form})
    return HttpResponseRedirect("/")
