from django.contrib import admin
from .models import TileProduct

@admin.register(TileProduct)
class TileProductAdmin(admin.ModelAdmin):
    list_display = ('name_ru', 'size_ru', 'color_ru')
    search_fields = ('name_ru', 'name_tk')