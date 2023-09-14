# Generated by Django 4.1.9 on 2023-09-14 01:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_job_is_actual'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(help_text='Enter review')),
                ('rating', models.IntegerField(help_text='Enter rating from 0 to 10', validators=[django.core.validators.MinValueValidator(0, message='The number cannot be less than 0'), django.core.validators.MaxValueValidator(10, message='The number cannot be more than 10')])),
                ('date_added', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
