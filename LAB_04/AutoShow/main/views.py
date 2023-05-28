from django.shortcuts import render
from .models import *


# Create your views here.

def index(request):
 cars  = Car.objects.all()[:5]
 return render(request, 'index.html', context={'cars':cars})

def CarsList(request):
 cars  = Car.objects.all()
 return render(request, 'cars.html', context={'cars':cars})