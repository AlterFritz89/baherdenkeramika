from rest_framework import generics
from .models import News
from .serializers import NewsSerializer

class NewsListCreateView(generics.ListCreateAPIView):
    queryset = News.objects.all().order_by('-created_at')
    serializer_class = NewsSerializer
    