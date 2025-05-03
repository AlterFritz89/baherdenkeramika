from django.db import models
from django.utils.translation import gettext_lazy as _

class SanitaryCategory(models.Model):
    name_tk = models.CharField(max_length=100, verbose_name="Название (туркм.)")
    name_ru = models.CharField(max_length=100, verbose_name="Название (рус.)")
    
    class Meta:
        verbose_name = _("Категория сантехники")
        verbose_name_plural = _("Категории сантехники")
    
    def __str__(self):
        return self.name_ru

class SanitaryProduct(models.Model):
    category = models.ForeignKey(
        SanitaryCategory, 
        on_delete=models.CASCADE,
        verbose_name="Категория"
    )
    name_tk = models.CharField(max_length=200, verbose_name="Название (туркм.)")
    name_ru = models.CharField(max_length=200, verbose_name="Название (рус.)")
    image = models.ImageField(
        upload_to='sanitaryware/',
        verbose_name="Изображение"
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Цена"
    )
    material_tk = models.CharField(max_length=100, verbose_name="Материал (туркм.)")
    material_ru = models.CharField(max_length=100, verbose_name="Материал (рус.)")
    dimensions_tk = models.CharField(max_length=100, verbose_name="Размеры (туркм.)")
    dimensions_ru = models.CharField(max_length=100, verbose_name="Размеры (рус.)")
    color_tk = models.CharField(max_length=100, verbose_name="Цвет (туркм.)")
    color_ru = models.CharField(max_length=100, verbose_name="Цвет (рус.)")

    class Meta:
        verbose_name = _("Сантехническое изделие")
        verbose_name_plural = _("Сантехнические изделия")
    
    def __str__(self):
        return self.name_ru