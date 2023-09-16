from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'cart'

urlpatterns = [
    path('', views.cart_detail, name='cart_detail'),
    path('add/<int:car_id>/',
         views.cart_add,
         name='cart_add'),
    path('remove/<int:car_id>/',
         views.cart_remove,
         name='cart_remove'),
    path('apply/', views.coupon_apply, name='apply'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)