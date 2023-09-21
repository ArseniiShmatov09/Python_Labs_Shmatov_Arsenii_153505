from django.db import models
from main.models import Car, Client


class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return 'Order {}'.format(self.id)

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    car = models.ForeignKey(Car, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=15, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    delivery_date = models.IntegerField(default=10)
    sale_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)  
    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        return self.price * self.quantity