# Generated by Django 3.1.2 on 2021-04-25 13:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vacancies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancy',
            name='recruiter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='published_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='vacancy',
            name='respond',
            field=models.ManyToManyField(blank=True, related_name='responded_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
