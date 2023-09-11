from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name = 'index'),
    path('cars', views.CarsList, name = 'cars'),
    path('cars/<int:id>', views.car_detail, name = 'car_details'),
    path('<str:car_carcass>', views.CarsList,name='car_list_by_carcass'),
    path('register/', views.RegisterUser.as_view(), name = 'register'),
    path('logout/', views.logout_user, name = 'logout'),
    path('login/', views.LoginUser.as_view(), name = 'login'),
    path("create/", views.car_create, name='create'),
    path("cars/edit/<int:id>/", views.car_edit),
    path("cars/delete/<int:id>/", views.car_delete),
    path('news/', views.news, name = 'news'),
    path('privacy_policy/', views.privacy_policy, name = 'privacy_policy'),
    
    

]