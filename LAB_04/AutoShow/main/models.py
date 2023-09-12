from django.db import models
from django.urls import reverse

# Create your models here.
class News(models.Model):
    title = models.CharField(max_length=50, help_text="Enter title")
    essence= models.CharField(max_length=50, help_text="Enter essence")
    photo = models.ImageField(upload_to='images', blank=True)
    description = models.TextField(help_text="Enter description")
    
    def __str__(self):
       return self.description
    def get_absolute_url(self):        
        return reverse('main:news', args=[str(self.id)])
    
class Car(models.Model):
    brand = models.CharField(max_length = 20, help_text="Enter brand")
    year_of_publication = models.IntegerField(help_text="Enter year of publication")
    model = models.CharField(max_length = 20, help_text="Enter model")
    description = models.TextField(help_text="Enter description")
    cost = models.IntegerField()
    color = models.CharField(max_length = 20, help_text="Enter color")
    carcass_type = models.ForeignKey('CarcassType', on_delete=models.SET_NULL, null=True, help_text="Choose carcass type")
    producer = models.ForeignKey('Producer', on_delete=models.SET_NULL, null=True, help_text="Choose producer")
    photo = models.ImageField(upload_to='images', blank=True)
    purchase_count = models.PositiveIntegerField(default=0)

    def __str__(self) :
        return '{0}, {1}'.format(self.brand, self.model)   
    
    def get_absolute_url(self):        
        return reverse('main:car_details', args=[str(self.id)])


class CarcassType(models.Model):
    designation = models.CharField(max_length=20, help_text="Enter type")

    def __str__(self):
       return self.designation
    
    def get_absolute_url(self):        
       return reverse('main:car_list_by_carcass', args=[str(self.designation)])

class Producer(models.Model):
    country = models.CharField(max_length=20, help_text="Enter country")
    owner = models.CharField(max_length=20, help_text="Enter owner")

    def __str__(self):
        return '{0}, {1}'.format(self.country, self.owner) 

class Client(models.Model) :
    first_name = models.CharField(max_length=20, help_text='Enter first name')
    last_name = models.CharField(max_length=20, help_text='Enter last name')
    date_of_birth = models.DateField(help_text="Enter date of birth")
    email = models.EmailField(help_text="Enter email")
    phone_number = models.CharField(max_length=15, help_text='Enter phone number')

    def __str__(self) :
        return '{0}, {1}'.format(self.first_name, self.last_name) 
    
    def get_absolute_url(self):        
        return reverse('client-detail', args=[str(self.id)])
    