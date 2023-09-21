from django import forms

class MonthForm(forms.Form):
    month = forms.IntegerField()

class YearForm(forms.Form):
    year = forms.IntegerField()
