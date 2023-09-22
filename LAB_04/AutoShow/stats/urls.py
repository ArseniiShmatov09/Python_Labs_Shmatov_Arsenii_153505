from . import views
from django.urls import path

app_name = 'order'

urlpatterns = [
    path('report/', views.report, name='report'),
]