from django.contrib import admin
from .models import GalleryImage

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title_ru', 'created_at')
    search_fields = ('title_ru', 'title_tk')