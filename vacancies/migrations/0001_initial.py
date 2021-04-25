# Generated by Django 3.1.2 on 2021-04-25 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('info', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=126, unique=True)),
                ('text', models.TextField()),
                ('views', models.PositiveIntegerField(default=0)),
                ('publish_date', models.DateField(auto_now_add=True)),
                ('salary', models.PositiveIntegerField()),
                ('required_skills', models.ManyToManyField(related_name='vacancy_required_skills', to='info.Skills')),
            ],
        ),
    ]
