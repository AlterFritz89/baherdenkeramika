from django.db import models
from django.utils.translation import gettext_lazy as _

class GalleryImage(models.Model):
    image = models.ImageField(upload_to='gallery/')
    title_ru = models.CharField(max_length=200)
    title_tk = models.CharField(max_length=200)
    description_ru = models.TextField()
    description_tk = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Gallery Image")
        verbose_name_plural = _("Gallery Images")

    def __str__(self):
        return self.title_ru