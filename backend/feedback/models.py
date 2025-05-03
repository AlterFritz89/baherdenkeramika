from django.db import models
from django.utils.translation import gettext_lazy as _

class Feedback(models.Model):
    STATUS_CHOICES = (
        ('pending', _('На модерации')),
        ('approved', _('Одобрено')),
        ('rejected', _('Отклонено')),
    )

    name = models.CharField(max_length=100, verbose_name=_('Имя'))
    email = models.EmailField(verbose_name=_('Email'))
    subject = models.CharField(max_length=50, verbose_name=_('Тема'))
    message = models.TextField(verbose_name=_('Сообщение'))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name=_('Статус'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата создания'))

    class Meta:
        verbose_name = _('Отзыв')
        verbose_name_plural = _('Отзывы')

    def __str__(self):
        return f"{self.name} - {self.subject}"