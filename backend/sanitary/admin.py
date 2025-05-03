from django.contrib import admin
from .models import SanitaryCategory, SanitaryProduct

@admin.register(SanitaryCategory)
class SanitaryCategoryAdmin(admin.ModelAdmin):
    list_display = ('name_ru', 'name_tk')
    search_fields = ('name_ru', 'name_tk')

@admin.register(SanitaryProduct)
class SanitaryProductAdmin(admin.ModelAdmin):
    list_display = ('name_ru', 'category', 'price')
    list_filter = ('category',)
    search_fields = ('name_ru', 'name_tk')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        return obj.image.url if obj.image else ''
    image_preview.short_description = 'Предпросмотр'