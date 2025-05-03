# backend/advertisements/models.py
from django.db import models
from django.utils.translation import gettext_lazy as _

class Advertisement(models.Model):
    image = models.ImageField(upload_to='ads/', verbose_name=_("Изображение"))
    alt_text = models.CharField(max_length=100, verbose_name=_("Описание"))
    url = models.URLField(blank=True, verbose_name=_("Ссылка"))
    is_active = models.BooleanField(default=True, verbose_name=_("Активно"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Рекламный баннер")
        verbose_name_plural = _("Рекламные баннеры")
        ordering = ['-created_at']

    def __str__(self):
        return self.alt_text