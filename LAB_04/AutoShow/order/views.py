from django.shortcuts import render
from .models import OrderItem
#from .forms import OrderCreateForm
from cart.cart import Cart
from main.models import Client
from .models import Order
from django.core.exceptions import PermissionDenied

def order_create(request):

    if not request.user.is_authenticated:
        raise PermissionDenied("No access")

    cart = Cart(request)
    if request.method == 'POST':        
        order = Order.objects.create(client = Client.objects.filter(email=request.user.email).first())

        for item in cart:
            
            sale_amount = item['price'] * item['quantity']  # Вычисление суммы продажи
            OrderItem.objects.create(order=order,
                                        car=item['car'],
                                        price=item['price'],
                                        quantity=item['quantity'],
                                        sale_amount=sale_amount)
            item['car'].purchase_count += item['quantity']
            item['car'].save()
        # очистка корзины
        cart.clear()
       
        return render(request, 'order/created.html',
                  {'order': order})
   
    return render(request, 'order/create.html',
                  {'cart': cart})