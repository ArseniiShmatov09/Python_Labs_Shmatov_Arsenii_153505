from django import forms

class MonthForm(forms.Form):
    MONTH_CHOICES = [
        (1, 'Январь'),
        (2, 'Февраль'),
        (3, 'Март'),
        (4, 'Апрель'),
        (5, 'Май'),
        (6, 'Июнь'),
        (7, 'Июль'),
        (8, 'Август'),
        (9, 'Сентябрь'),
        (10, 'Октябрь'),
        (11, 'Ноябрь'),
        (12, 'Декабрь'),
    ]

    month = forms.ChoiceField(choices=MONTH_CHOICES, label='Месяц')

class YearForm(forms.Form):
    YEAR_CHOICES = [(year, year) for year in range(2010, 2024)]

    year = forms.ChoiceField(choices=YEAR_CHOICES, label='Год')