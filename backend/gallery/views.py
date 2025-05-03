from django.shortcuts import render
from rest_framework import generics
from .models import GalleryImage
from .serializers import GalleryImageSerializer

class GalleryImageListView(generics.ListAPIView):
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer
# Create your views here.
