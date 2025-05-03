from django.db import models
from django.utils.translation import gettext_lazy as _
from django_resized import ResizedImageField
class TileProduct(models.Model):
    class Meta:
        verbose_name = _("Плитка")
        verbose_name_plural = _("Плитки")

    name_ru = models.CharField(max_length=100, verbose_name=_("Название (рус)"))
    name_tk = models.CharField(max_length=100, verbose_name=_("Название (туркм)"))
    image = models.ImageField(upload_to='tiles/', verbose_name=_("Изображение"))
    
    # Характеристики
    size_ru = models.CharField(max_length=50, verbose_name=_("Размер (рус)"))
    size_tk = models.CharField(max_length=50, verbose_name=_("Размер (туркм)"))
    color_ru = models.CharField(max_length=50, verbose_name=_("Цвет (рус)"))
    color_tk = models.CharField(max_length=50, verbose_name=_("Цвет (туркм)"))
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name_ru
    image = ResizedImageField(
    size=[800, 800],
    quality=85,
    upload_to='tiles/',
    verbose_name=_("Изображение")
)