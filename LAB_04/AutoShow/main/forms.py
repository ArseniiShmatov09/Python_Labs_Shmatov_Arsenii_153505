from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.core.validators import RegexValidator
from datetime import date
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from .models import Car, Review
from django.core.validators import MinValueValidator, MaxValueValidator


def validate_age(value):
    today = date.today()
    age = today.year - value.year - int((today.month, today.day) < (value.month, value.day))
    if int(age) < 18:
        raise ValidationError("You must be over 18 years old")

class RegisterUserForm(UserCreationForm):
   username = forms.CharField(label='login', widget= forms.TextInput(attrs={'class':'form-input'}))
   
   first_name = forms.CharField(label='first name', widget= forms.TextInput(attrs={'class':'form-input'}))
   last_name = forms.CharField(label='last name', widget= forms.TextInput(attrs={'class':'form-input'}))
   email = forms.CharField(label='email', widget= forms.EmailInput(attrs={'class':'form-input'}))
   town = forms.CharField(label='town', widget= forms.TextInput(attrs={'class':'form-input'}))
   date_birthday = forms.DateField(label='date of birth', widget= forms.DateInput(attrs={'class':'form-input'}), validators=[validate_age])
   phone_number = forms.CharField(label='phone number',widget= forms.TextInput(attrs={'class':'form-input'}),
                                   validators=[RegexValidator(
                                       regex=r'^(\+375 \(29\) [0-9]{3}-[0-9]{2}-[0-9]{2})$',
                                       message='Format +375 (29) XXX-XX-XX',
                                   )])
   password1 = forms.CharField(label='password', widget= forms.PasswordInput(attrs={'class':'form-input'}))
   password2 = forms.CharField(label='repeat password', widget= forms.PasswordInput(attrs={'class':'form-input'}))
   
   
   class Meta:
        model = User
        fields = ('username','first_name','last_name', 'email','town','date_birthday', 'phone_number','password1','password2')


class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label='login', widget= forms.TextInput(attrs={'class':'form-input'}))
    password = forms.CharField(label='password', widget= forms.PasswordInput(attrs={'class':'form-input'}))

class CarForm(forms.ModelForm):
    brand = forms.CharField(label='brand', widget= forms.TextInput(attrs={'class':'form-input'}))
    model = forms.CharField(label='model', widget= forms.TextInput(attrs={'class':'form-input'}))
    year_of_publication = forms.IntegerField(label='year_of_publication', widget= forms.TextInput(attrs={'class':'form-input'}))
    cost = forms.IntegerField(label='cost', widget= forms.TextInput(attrs={'class':'form-input'}))
    color = forms.CharField(label='color', widget= forms.TextInput(attrs={'class':'form-input'}))

    class Meta:
        model = Car
        fields = ['brand', 'model', 'year_of_publication', 'description', 'cost', 'color', 'carcass_type', 'producer', 'photo'] 

class ReviewForm(forms.ModelForm):
    text = forms.CharField(label='text', widget= forms.TextInput(attrs={'class':'form-input'}))
    rating = forms.IntegerField(label='rating', widget= forms.NumberInput(attrs={'class': 'form-input', 'min': 0, 'max': 10}),  validators=[
        MinValueValidator(0, message="The number cannot be less than 0"),
        MaxValueValidator(10, message="The number cannot be more than 10")
    ])

    class Meta:
      model = Review
      fields = ['text', 'rating'] 


class Promotional_codeForm(forms.Form):
    value = forms.CharField()
