from django.shortcuts import render, redirect

# Create your views here.
def mainpage(request):
    return render(request, template_name="frontend/index.html")

def view_404(request, exception=None):
    # do something
    return redirect("/")