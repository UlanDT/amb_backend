from django.shortcuts import render, get_object_or_404

from .models import Sox, Discount, Category


def index(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    sox = Sox.objects.all()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        sox = sox.filter(category=category)
    return render(request, 'main/home.html', {'category': category, 'categories': categories, 'sox': sox})


def sox_detail(request, id):
    sox = get_object_or_404(Sox, id=id)
    return render(request, 'sox_detail.html', {'sox': sox})


def our_sox(request):
    sox = Sox.objects.all()
    return render(request, 'main/Our-sox.html', {'sox': sox})
