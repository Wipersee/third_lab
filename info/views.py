from rest_framework.response import Response
from .models import Cities, Skills
from rest_framework.views import APIView

# Create your views here.
class SkillsListView(APIView):
    def get(self, request):
        return Response(Skills.objects.all().values("name"))
