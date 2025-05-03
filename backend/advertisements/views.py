# backend/advertisements/views.py
from rest_framework import generics
from .models import Advertisement
from .serializers import AdvertisementSerializer

class ActiveAdvertisementList(generics.ListAPIView):
    queryset = Advertisement.objects.filter(is_active=True).order_by('-updated_at')
    serializer_class = AdvertisementSerializer