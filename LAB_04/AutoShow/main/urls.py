from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('cars', views.CarsList, name = 'cars'),
    path('cars/<int:pk>', views.CarDetailView.as_view(), name = 'car-details'),
    path('<str:car_carcass>', views.CarsList,name='car_list_by_carcass'),
    path('register/', views.RegisterUser.as_view(), name = 'register'),
    path('logout/', views.logout_user, name = 'logout'),
    path('login/', views.LoginUser.as_view(), name = 'login'),


]