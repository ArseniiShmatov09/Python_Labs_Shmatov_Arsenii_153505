from django.contrib import admin
from .models import Car, CarcassType, Producer, Client, News, FAQ, Job, Employee, Review, Promotional_code

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
    list_display = ['first_name', 'last_name', 'date_of_birth','email', 'phone_number', 'town' ]
    list_filter = ['first_name', 'last_name', 'date_of_birth','email', 'phone_number', 'town' ]

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'answer', 'date_added']

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['type_of_job', 'description']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone_number', 'photo', 'get_jobs']

    def get_jobs(self, obj):
        return ", ".join([str(j) for j in obj.job.all()]) 
    get_jobs.short_description = 'jobs'

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['text', 'rating', 'date_added']

@admin.register(Promotional_code)
class Promotional_code_Admin(admin.ModelAdmin):
    list_display = ['value', 'is_actual', 'discount']
