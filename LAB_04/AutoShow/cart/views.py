from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from main.models import Car
from .cart import Cart
from .forms import CartAddCarForm
from django.core.exceptions import PermissionDenied
from main.models import Promotional_code
from main.forms import Promotional_codeForm

@require_POST
def cart_add(request, car_id):
    if not request.user.is_authenticated:
        raise PermissionDenied("No acsess")

    cart = Cart(request)
    car = get_object_or_404(Car, id=car_id)
    form = CartAddCarForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(car=car,
                 quantity=cd['quantity'],
                 update_quantity=cd['update'])
    return redirect('cart:cart_detail')

def cart_remove(request, car_id):
    if not request.user.is_authenticated:
        raise PermissionDenied("No acsess")

    cart = Cart(request)
    car = get_object_or_404(Car, id=car_id)
    cart.remove(car)
    return redirect('cart:cart_detail')

def cart_detail(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("No acsess")
    cart = Cart(request)
    coupon_apply_form = Promotional_codeForm()

    return render(request, 'cart/detail.html', {'cart': cart, 'coupon_apply_form': coupon_apply_form})

@require_POST
def coupon_apply(request):
    form = Promotional_codeForm(request.POST)
    if form.is_valid():
        value = form.cleaned_data['value']
        try:
            promotional_code = Promotional_code.objects.get(value__iexact=value, 
                                        is_actual=True)
            request.session['promotional_code_id'] = promotional_code.id
        except :
            request.session['promotional_code_id'] = None
    return redirect('cart:cart_detail')