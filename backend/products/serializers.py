from rest_framework import serializers
from .models import TileProduct

class TileProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = TileProduct
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {
            'id': data['id'],
            'name': {
                'ru': data['name_ru'],
                'tk': data['name_tk']
            },
            'image': data['image'],
            'characteristics': {
                'size': {
                    'ru': data['size_ru'],
                    'tk': data['size_tk']
                },
                'color': {
                    'ru': data['color_ru'],
                    'tk': data['color_tk']
                }
            }
        }