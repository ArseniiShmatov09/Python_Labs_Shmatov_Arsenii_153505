from decimal import Decimal
from django.conf import settings
from main.models import Car
from main.models import Promotional_code


class Cart(object):

    def __init__(self, request):
        """
        Инициализируем корзину
        """
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            # save an empty cart in the session
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart
        self.promotional_code_id = self.session.get('promotional_code_id')


    def add(self, car, quantity=1, update_quantity=False):
        """
        Добавить продукт в корзину или обновить его количество.
        """
        car_id = str(car.id)
        if car_id not in self.cart:
            self.cart[car_id] = {'quantity': 0,
                                    'price': str(car.cost)}
        if update_quantity:
            self.cart[car_id]['quantity'] = quantity
        else:
            self.cart[car_id]['quantity'] += quantity
        self.save()

    def save(self):
        # Обновление сессии cart
        self.session[settings.CART_SESSION_ID] = self.cart
        # Отметить сеанс как "измененный", чтобы убедиться, что он сохранен
        self.session.modified = True

    def remove(self, car):
        """
        Удаление товара из корзины.
        """
        car_id = str(car.id)
        if car_id in self.cart:
            del self.cart[car_id]
            self.save()

    def __iter__(self):
        """
        Перебор элементов в корзине и получение продуктов из базы данных.
        """
        car_ids = self.cart.keys()
        # получение объектов product и добавление их в корзину
        cars = Car.objects.filter(id__in=car_ids)
        for car in cars:
            self.cart[str(car.id)]['car'] = car

        for item in self.cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item

    def __len__(self):
        """
        Подсчет всех товаров в корзине.
        """
        return sum(item['quantity'] for item in self.cart.values())
    
    def get_total_price(self):
        """
        Подсчет стоимости товаров в корзине.
        """
        return sum(Decimal(item['price']) * item['quantity'] for item in
                self.cart.values())
    
    def clear(self):
        # удаление корзины из сессии
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True


    @property
    def coupon(self):
        if self.promotional_code_id:
            return Promotional_code.objects.get(id=self.promotional_code_id)
        return None

    def get_discount(self):
        if self.coupon:
            return (self.coupon.discount / Decimal('100')) * self.get_total_price()
        return Decimal('0')

    def get_total_price_after_discount(self):
        return self.get_total_price() - self.get_discount()