from django.urls import path
from . import views

urlpatterns = [
    path("me/", views.UserView.as_view()),
    path("upload_avatar/", views.UploadAvatar.as_view()),
    path("edit_user/<uuid:pk>/", views.UserCRUD.as_view()),
    path("edit_user_skills/<uuid:pk>/", views.UpdateSkills.as_view()),
]
