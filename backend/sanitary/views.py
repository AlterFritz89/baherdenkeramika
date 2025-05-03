from rest_framework import viewsets
from .models import SanitaryCategory, SanitaryProduct
from .serializers import SanitaryCategorySerializer, SanitaryProductSerializer

class SanitaryCategoryViewSet(viewsets.ModelViewSet):
    queryset = SanitaryCategory.objects.all()
    serializer_class = SanitaryCategorySerializer

class SanitaryProductViewSet(viewsets.ModelViewSet):
    queryset = SanitaryProduct.objects.all()
    serializer_class = SanitaryProductSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}