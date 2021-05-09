from django.shortcuts import render
from .serializers import UserSerializer, UserEditSerializer
from rest_framework import generics
from .models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from info.models import Skills


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        pk = self.kwargs.get("pk")
        object = User.objects.get(username=request.user.username)
        serializer = UserSerializer(object)
        output = serializer.data
        skills = object.skills.all()
        output["skills"] = skills.values("name")
        return Response(output)


class UploadAvatar(APIView):
    def post(self, request):
        user = User.objects.get(username=request.user)
        user.avatar = request.data["file"]
        user.save()
        return Response("ok")


class UserCRUD(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserEditSerializer
    queryset = User.objects.all()


class UpdateSkills(APIView):
    def put(self, request, pk):
        user = User.objects.filter(id=pk).first()
        if user:
            skills = request.data.get("skills")
            user.skills.all().delete()
            for skill in skills:
                skl, created = Skills.objects.get_or_create(name=skill)
                user.skills.add(skl if skl else created)
            user.save()
            return Response("ok")
        return Response("User not found")