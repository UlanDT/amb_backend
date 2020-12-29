from django.contrib import admin

from .models import Sox, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Sox)
class SoxAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'size',)
    search_fields = ['title',]
