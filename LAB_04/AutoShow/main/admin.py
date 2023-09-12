from django.contrib import admin
from .models import Car, CarcassType, Producer, Client, News

# Register your models here.

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'year_of_publication', 'description', 'cost', 'color', 'carcass_type', 'producer'] 
    list_filter = ['brand', 'year_of_publication', 'cost', 'carcass_type']

@admin.register(CarcassType)
class CarcassTypeAdmin(admin.ModelAdmin):
    list_display = ['designation']

@admin.register(Producer)
class ProducerAdmin(admin.ModelAdmin):
    list_display = ['country', 'owner']

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'essence', 'description', 'photo']

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'date_of_birth','email', 'phone_number' ]
    list_filter = ['first_name', 'last_name', 'date_of_birth','email', 'phone_number' ]






