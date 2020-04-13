from django.urls import path

from . import views

urlpatterns = [
    path('mainPage', views.home, name='mainPage'),
]