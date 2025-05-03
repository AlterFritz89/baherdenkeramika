from django.db import models
from django.utils.translation import gettext_lazy as _

class News(models.Model):
    # Общие поля (изображение, дата)
    image = models.ImageField(upload_to='news/', verbose_name=_('Изображение'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата создания'))

    # Русская версия
    title_ru = models.CharField(max_length=200, verbose_name=_('Заголовок (рус)'), null=True, blank=True)
    preview_ru = models.TextField(verbose_name=_('Превью (рус)'), null=True, blank=True)
    full_text_ru = models.TextField(verbose_name=_('Полный текст (рус)'), null=True, blank=True)

    # Туркменская версия
    title_tk = models.CharField(max_length=200, verbose_name=_('Заголовок (туркм)'), null=True, blank=True)
    preview_tk = models.TextField(verbose_name=_('Превью (туркм)'), null=True, blank=True)
    full_text_tk = models.TextField(verbose_name=_('Полный текст (туркм)'), null=True, blank=True)

    def __str__(self):
        return self.title_ru

    class Meta:
        verbose_name = _('Новость')
        verbose_name_plural = _('Новости')