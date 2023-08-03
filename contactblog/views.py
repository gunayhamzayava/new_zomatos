from django_filters.rest_framework import DjangoFilterBackend
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
from .serializers import *
from .filters import *
from .models import *
import json


class BlogListView(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = BlogFilter


@api_view(["GET"])
def get_article(request, id):
    try:
        blog = Blog.objects.get(id=id)
        serializer = BlogSerializer(blog)
        return Response(serializer.data)
    except Blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return JsonResponse({'error': 'All fields are required.'}, status=400)

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({'error': 'Invalid email address.'}, status=400)

        try:
            contact = Contact(name=name, email=email, message=message)
            contact.save()

            subject = 'Teşekkürler!'
            message = f"Merhaba {name},\n\nİletişim bilgileriniz başarıyla kaydedildi. Size en kısa sürede dönüş yapacağız."
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]

            try:
                send_mail(subject, message, from_email, recipient_list)
                return JsonResponse({'success': True})
            except Exception as e:
                print(e)
                return JsonResponse({'error': 'An error occurred while sending the email.'}, status=500)
        except Exception as e:
            return JsonResponse({'error': 'An error occurred while saving the contact.'}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=400)
