from django.contrib import admin

from .models import Discount, Sox, Category


@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('discount_rate',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Sox)
class SoxAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'size',)