from django.contrib import admin

from .models import Order, Item
from utils.prizes import get_order_total_prize


class ItemAdmin(admin.TabularInline):
    model = Item
    fields = ('product', 'quantity', 'prize')
    readonly_fields = ('prize', )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    fields = ('status', 'created', 'finished', 'owner', 'total_prize')
    readonly_fields = ('created', 'total_prize')
    date_hierarhy = 'created'
    empty_value_display = 'пусто'
    inlines = [ItemAdmin, ]

    def total_prize(self, ord):
        return get_order_total_prize(ord)
