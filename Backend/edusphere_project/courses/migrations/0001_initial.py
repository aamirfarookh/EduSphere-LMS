# Generated by Django 4.2.4 on 2023-09-01 19:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('departments', '__first__'),
        ('instructors', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_code', models.CharField(max_length=10)),
                ('course_name', models.CharField(max_length=100)),
                ('credits', models.PositiveIntegerField()),
                ('description', models.TextField()),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='departments.department')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='instructors.instructor')),
            ],
        ),
    ]
