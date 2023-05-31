from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('cars', views.CarsList, name = 'cars'),
    path('cars/<int:pk>', views.CarDetailView.as_view(), name = 'car-details'),
    path('<str:car_carcass>', views.CarsList,name='car_list_by_carcass'),
]