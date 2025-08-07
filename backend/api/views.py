from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from .serializers import UserSerializer
import requests


class CreateUserViews(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class AIAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Remove this if public access needed

    def get(self, request):
        return Response({'message': 'GET request to AI endpoint is working!'})

    def post(self, request):
        user_prompt = request.data.get('prompt')

        if not user_prompt:
            return Response({'error': 'Prompt is required.'}, status=400)

        headers = {
            "Authorization": f"Bearer {settings.AI_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://your-hackathon-app.com",  # Replace later
            "X-Title": "Hackathon AI Assistant"
        }

        payload = {
            "model": settings.AI_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are an AI expert helping solve overpopulation problems in the Philippines."
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ]
        }

        response = requests.post(
            f"{settings.AI_API_BASE_URL}/chat/completions",
            headers=headers,
            json=payload
        )

        if response.status_code == 200:
            data = response.json()
            return Response({
                "response": data["choices"][0]["message"]["content"]
            })
        else:
            return Response({
                "error": "AI request failed.",
                "details": response.text
            }, status=response.status_code)
