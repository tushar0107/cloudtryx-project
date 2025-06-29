from django.urls import path
from . import views
urlpatterns = [
    path('api/login/',views.UserView.as_view()),
    path('api/signup/',views.CreateUserView.as_view()),
]