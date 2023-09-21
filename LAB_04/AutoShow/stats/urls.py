from . import views
from django.urls import path

app_name = 'order'

urlpatterns = [
    path('report/', views.monthly_sales_report, name='report'),
]