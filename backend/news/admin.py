from django.contrib import admin
from django.utils.translation import gettext_lazy as _  # Добавьте этот импорт
from .models import News

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title_ru', 'created_at')
    fieldsets = (
        (_('Изображение'), {'fields': ('image',)}),
        (_('Русская версия'), {
            'fields': ('title_ru', 'preview_ru', 'full_text_ru')
        }),
        (_('Туркменская версия'), {
            'fields': ('title_tk', 'preview_tk', 'full_text_tk')
        }),
    )