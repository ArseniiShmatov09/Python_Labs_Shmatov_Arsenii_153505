from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['car']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'client',
                    'created']
    list_filter = ['created']
    inlines = [OrderItemInline]

admin.site.register(Order, OrderAdmin)