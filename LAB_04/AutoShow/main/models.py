from django.db import models
from django.urls import reverse
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


# Create your models here.
class News(models.Model):
    title = models.CharField(max_length=50, help_text="Enter title")
    essence = models.CharField(max_length=50, help_text="Enter essence")
    photo = models.ImageField(upload_to='images', blank=True)
    description = models.TextField(help_text="Enter description")

    def __str__(self):
        return self.description

    def get_absolute_url(self):
        return reverse('main:news', args=[str(self.id)])


class Car(models.Model):
    brand = models.CharField(max_length=20, help_text="Enter brand")
    year_of_publication = models.IntegerField(
        help_text="Enter year of publication")
    model = models.CharField(max_length=20, help_text="Enter model")
    description = models.TextField(help_text="Enter description")
    cost = models.IntegerField()
    color = models.CharField(max_length=20, help_text="Enter color")
    carcass_type = models.ForeignKey(
        'CarcassType', on_delete=models.SET_NULL, null=True, help_text="Choose carcass type")
    producer = models.ForeignKey(
        'Producer', on_delete=models.SET_NULL, null=True, help_text="Choose producer")
    photo = models.ImageField(upload_to='images', blank=True)
    purchase_count = models.PositiveIntegerField(default=0)

    def __str__(self):
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


class Client(models.Model):
    first_name = models.CharField(max_length=20, help_text='Enter first name')
    last_name = models.CharField(max_length=20, help_text='Enter last name')
    date_of_birth = models.DateField(help_text="Enter date of birth")
    email = models.EmailField(help_text="Enter email")
    phone_number = models.CharField(
        max_length=15, help_text='Enter phone number')

    def __str__(self):
        return '{0}, {1}'.format(self.first_name, self.last_name)

    def get_absolute_url(self):
        return reverse('client-detail', args=[str(self.id)])


class FAQ(models.Model):
    question = models.CharField(max_length=150, help_text="Enter question")
    answer = models.TextField(help_text="Enter answer")
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

    def get_absolute_url(self):
        return reverse('main:FAQ', args=[str(self.question)])


class Employee(models.Model):
    first_name = models.CharField(max_length=20, help_text='Enter first name')
    last_name = models.CharField(max_length=20, help_text='Enter last name')
    email = models.EmailField(help_text="Enter email")
    phone_number = models.CharField(max_length=25, help_text='Enter phone number', validators=[RegexValidator(
        regex=r'^(\+375 \(29\) [0-9]{3}-[0-9]{2}-[0-9]{2})$',
        message='Format +375 (29) XXX-XX-XX',
    )])
    photo = models.ImageField(upload_to='images', blank=True)
    job = models.ManyToManyField('Job', help_text="Choose type(s) of job")

    def __str__(self):
        return self.last_name


class Job(models.Model):
    type_of_job = models.CharField(
        max_length=70, help_text='Enter type of ypor job')
    description = models.TextField(help_text="Enter description", default="")
    is_actual = models.BooleanField(help_text="Is actual?", default=False)

    def __str__(self):
        return self.type_of_job


class Review(models.Model):
    text = models.TextField(help_text="Enter review")
    rating = models.IntegerField(help_text="Enter rating from 0 to 10",  validators=[
        MinValueValidator(0, message="The number cannot be less than 0"),
        MaxValueValidator(10, message="The number cannot be more than 10")
    ])
    date_added = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=20, default='')
    #author =  models.OneToOneField(User, on_delete=models.CASCADE)
    def get_absolute_url(self):
        return reverse('main:reviews', args=[str(self.text)])

class Promotional_code(models.Model):
    value = models.TextField(help_text="Enter promocode")
    is_actual = models.BooleanField(default=False)

