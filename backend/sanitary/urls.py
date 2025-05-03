from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SanitaryCategoryViewSet,
    SanitaryProductViewSet
)

router = DefaultRouter()
router.register(r'categories', SanitaryCategoryViewSet)
router.register(r'products', SanitaryProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Другие URL вашего приложения products
]