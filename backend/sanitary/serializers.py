from rest_framework import serializers
from .models import SanitaryCategory, SanitaryProduct

class SanitaryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SanitaryCategory
        fields = ['id', 'name_tk', 'name_ru']

class SanitaryProductSerializer(serializers.ModelSerializer):
    category = SanitaryCategorySerializer()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SanitaryProduct
        fields = '__all__'
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None