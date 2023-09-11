from django.urls import reverse 
import pytest
import requests
import django.test.client
import django.test.utils
from django.conf import settings


def test_home_page(): # Get the home page 
    url = 'http://127.0.0.1:8000'
    response = requests.get(url)
    assert response.status_code == 200

def test_home_page1(): # Get the home page 
    url = 'http://127.0.0.1:8000/cars'
    response = requests.get(url)
    assert response.status_code == 200


def test_home_page56(): # Get the home page 
    url = 'http://127.0.0.1:8000/cars/1'
    response = requests.get(url)
    assert response.status_code == 200



def test_home_page2(): # Get the home page 
    url = 'http://127.0.0.1:8000/cars/2'
    response = requests.get(url)
    assert response.status_code == 200

def test_home_page3(): # Get the home page 
    url = 'http://127.0.0.1:8000/cars/3'
    response = requests.get(url)
    assert response.status_code == 200


def test_home_page45(): # Get the home page 
    url = 'http://127.0.0.1:8000/login/'
    response = requests.get(url)
    assert response.status_code == 200

def test_home_page453(): # Get the home page 
    url = 'http://127.0.0.1:8000/register/'
    response = requests.get(url)
    assert response.status_code == 200