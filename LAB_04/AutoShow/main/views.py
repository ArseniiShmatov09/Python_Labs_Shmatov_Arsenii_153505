from django.shortcuts import render
from .models import *
from django.views.generic import DetailView


# Create your views here.

def index(request):
 cars  = Car.objects.all()[:1]
 return render(request, 'index.html', context={'cars':cars})

def CarsList(request):
 cars  = Car.objects.all()
 return render(request, 'cars.html', {'cars':cars})

class CarDetailView(DetailView):
  model = Car
  template_name = 'car_details.html'
