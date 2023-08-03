# Generated by Django 3.2 on 2023-08-03 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contactblog', '0015_alter_blog_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='category',
            field=models.CharField(blank=True, choices=[('community', 'Community'), ('company', 'Company'), ('culture', 'Culture'), ('technology', 'Technology')], max_length=15, null=True),
        ),
    ]