from django.urls import path
from rest_framework import routers

from .views import index, sox_detail

urlpatterns = [
    path('', index, name='home'),
    path('<slug:category_slug>', index, name='sox_list_by_category'),
    path('<int:id>', sox_detail, name='sox_detail'),
]
