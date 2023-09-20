import pytest
from django.contrib.auth.models import User
from django.test import Client
from main.models import Car, CarcassType, Producer, FAQ, Employee, Job, Review, Promotional_code

from django.urls import reverse

@pytest.fixture
def user_client():
    # Создаем пользователя и возвращаем клиента, авторизованного от его имени
    user = User.objects.create_user(username='testuser', password='testpassword')
    client = Client()
    client.login(username='testuser', password='testpassword')
    yield client  # Возвращаем клиента


@pytest.mark.django_db
def test_user_exists(user_client):
    assert User.objects.filter(username='testuser').exists()

@pytest.mark.django_db
def test_login(user_client):
    response = user_client.get('http://127.0.0.1:8000/reviews/')  # Пример URL, который требует аутентификации
    assert response.status_code == 200  # Проверяем, что пользователь аутентифицирован

@pytest.mark.django_db
@pytest.mark.parametrize("brand, model, year, cost", [
    ("BMW", "X5", 2022, 75000.0),  # Набор 1
    ("Audi", "A4", 2021, 60000.0),  # Набор 2
    ("Toyota", "Camry", 2023, 55000.0),  # Набор 3
])
def test_create_car_instance(brand, model, year, cost):
    car = Car.objects.create(
        brand=brand,
        model=model,
        year_of_publication=year,
        cost=cost
    )
    assert car is not None
    assert car.brand == brand
    assert car.model == model
    assert car.year_of_publication == year
    assert car.cost == cost


@pytest.fixture
def sample_carcass_type():
    return CarcassType.objects.create(designation="Sedan")

@pytest.fixture
def sample_producer():
    return Producer.objects.create(country="Germany", owner="Volkswagen")

@pytest.mark.django_db
def test_car_create_with_carcass_type_and_producer(sample_carcass_type, sample_producer):
    car = Car.objects.create(
        brand="Volkswagen",
        model="Passat",
        year_of_publication=2022,
        description="Description",
        cost=35000,
        color="Blue",
        carcass_type=sample_carcass_type,
        producer=sample_producer,
    )
    assert car.carcass_type == sample_carcass_type
    assert car.producer == sample_producer

@pytest.mark.django_db
def test_car_purchase_count_increment():
    car = Car.objects.create(
        brand="Toyota",
        model="Camry",
        year_of_publication=2021,
        description="Description",
        cost=30000,
        color="Black",
    )
    initial_purchase_count = car.purchase_count
    car.purchase_count += 1
    car.save()
    assert car.purchase_count == initial_purchase_count + 1

@pytest.mark.django_db
def test_car_absolute_url():
    car = Car.objects.create(
        brand="Honda",
        model="Civic",
        year_of_publication=2022,
        description="Description",
        cost=28000,
        color="Red",
    )
    url = car.get_absolute_url()
    assert url == reverse('main:car_details', args=[str(car.id)])

@pytest.fixture
def sample_carcass_type():
    return CarcassType.objects.create(designation="Sedan")

@pytest.fixture
def sample_producer():
    return Producer.objects.create(country="Germany", owner="Volkswagen")


@pytest.mark.django_db
def test_carcass_type_string_representation(sample_carcass_type):
    assert str(sample_carcass_type) == sample_carcass_type.designation

@pytest.mark.django_db
def test_producer_string_representation(sample_producer):
    assert str(sample_producer) == f"{sample_producer.country}, {sample_producer.owner}"

@pytest.fixture
def sample_faq():
    return FAQ.objects.create(
        question="What is the FAQ?",
        answer="This is a frequently asked question."
    )

@pytest.fixture
def sample_employee():
    return Employee.objects.create(
        first_name="John",
        last_name="Doe",
        email="johndoe@example.com",
        phone_number="+375 (29) 123-45-67"
    )

@pytest.fixture
def sample_job():
    return Job.objects.create(
        type_of_job="Developer",
        description="Software developer",
        is_actual=True
    )

@pytest.fixture
def sample_review():
    return Review.objects.create(
        text="Great product!",
        rating=9,
        author="John Doe"
    )

@pytest.fixture
def sample_promo_code():
    return Promotional_code.objects.create(
        value="DISCOUNT25",
        is_actual=True,
        discount=25
    )

@pytest.mark.django_db
def test_faq_string_representation(sample_faq):
    assert str(sample_faq) == sample_faq.question

@pytest.mark.django_db
def test_employee_string_representation(sample_employee):
    assert str(sample_employee) == f"{sample_employee.last_name}"

@pytest.mark.django_db
def test_job_string_representation(sample_job):
    assert str(sample_job) == sample_job.type_of_job

@pytest.mark.django_db
def test_review_string_representation(sample_review):
    assert str(sample_review) == sample_review.text

@pytest.mark.django_db
def test_promotional_code_string_representation(sample_promo_code):
    assert str(sample_promo_code) == sample_promo_code.value