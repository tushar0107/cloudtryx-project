from django.shortcuts import render
from django.contrib.auth import authenticate
# Create your views here.

from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.core.serializers import serialize


class UserView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user and user.is_authenticated:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Logged In Successfully',
                'data': token.key,
                'user': {'username':user.username,'first_name':user.first_name,'last_name':user.last_name,'email':user.email}
            },status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Invalid credentials',
            },status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(generics.CreateAPIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'User Created Successfully',
                'token': token.key,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Unexpected Error occurred',
                'error': serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)