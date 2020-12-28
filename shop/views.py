from django.shortcuts import render, get_object_or_404

from .models import Sox, Category
from cart.forms import CartAddProductForm


def index(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    sox = Sox.objects.all()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        sox = sox.filter(category=category)
    return render(request, 'shop/home.html', {'category': category, 'categories': categories, 'sox': sox})


def sox_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    sox = Sox.objects.all()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        sox = sox.filter(category=category)
    return render(request, 'shop/Shop.html', {'category': category, 'categories': categories, 'sox': sox})


def sox_detail(request, id):
    sox = get_object_or_404(Sox, id=id)
    cart_product_form = CartAddProductForm()
    return render(request, 'shop/sox_detail.html', {'sox': sox, 'cart_product_form': cart_product_form})


def our_sox(request):
    sox = Sox.objects.all()
    return render(request, 'shop/Our-sox.html', {'sox': sox})


def sale(request):
    return render(request, 'shop/Sale.html')
