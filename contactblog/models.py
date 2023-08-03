from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name


class Blog(models.Model):
    CATEGORY_CHOICES = [
        ('community', 'Community'),
        ('company', 'Company'),
        ('culture', 'Culture'),
        ('technology', 'Technology'),
    ]

    title = models.TextField()
    created_date = models.DateTimeField()
    category = models.CharField(
        max_length=15, choices=CATEGORY_CHOICES, blank=True, null=True)
    image = models.URLField()
    description = models.TextField(blank=True, null=True)
    question = models.TextField(blank=True, null=True)
    comments = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title
