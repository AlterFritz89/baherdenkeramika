from rest_framework import generics
from .models import TileProduct
from .serializers import TileProductSerializer

class TileProductListView(generics.ListAPIView):
    queryset = TileProduct.objects.all().order_by('-created_at')
    serializer_class = TileProductSerializer