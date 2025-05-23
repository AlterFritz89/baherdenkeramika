# Generated by Django 5.2 on 2025-04-30 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0002_feedback_subject'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='feedback',
            options={'verbose_name': 'Отзыв', 'verbose_name_plural': 'Отзывы'},
        ),
        migrations.AlterField(
            model_name='feedback',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='email',
            field=models.EmailField(max_length=254, verbose_name='Email'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='message',
            field=models.TextField(verbose_name='Сообщение'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='status',
            field=models.CharField(choices=[('pending', 'На модерации'), ('approved', 'Одобрено'), ('rejected', 'Отклонено')], default='pending', max_length=20, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='subject',
            field=models.CharField(max_length=50, verbose_name='Тема'),
        ),
    ]
