# Generated by Django 4.1.9 on 2023-09-14 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='author',
            field=models.CharField(default='', max_length=20),
        ),
    ]
