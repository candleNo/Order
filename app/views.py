
from django.shortcuts import render,redirect,HttpResponse
from django.views import View
from . import models

# Create your views here.
def orderCount():
    doing = models.Order.objects.filter(status=0)
    complete = models.Order.objects.filter(status=1)
    cancle = models.Order.objects.filter(status=2)

    count = {
        'doing': doing.__len__(),
        'complete': complete.__len__(),
        'cancle': cancle.__len__()
    }

    return count

class Home(View):
    def get(self,request):
        order = models.Order.objects.filter(status=0)
        for item in order:
            item.time = str(item.time).split(' ')[0]

        return render(request,'home.html',{'order': order,'count': orderCount()})
    def post(self,request):
        type = request.POST.get('type')
        val = request.POST.get('val')
        if type == 'complete':
            models.Order.objects.filter(id=val).update(status='1')
            return HttpResponse('OK')

        if type == 'cancle':
            models.Order.objects.filter(id=val).update(status='2')
            return HttpResponse('OK')

        if type == 'modify':
            models.Order.objects.filter(id=val).update(note=request.POST.get('value'))
            return HttpResponse('OK')

        if type == 'remove':
            models.Order.objects.filter(id=val).delete()
            return HttpResponse('OK')

def home(request,status):
    if request.method == 'GET':
        order = models.Order.objects.filter(status=status)
        for item in order:
            item.time = str(item.time).split(' ')[0]
        return render(request,'home.html', {'order': order,'count': orderCount(),'status': status})

class Add(View):
    def get(self,request):
        return render(request, 'add.html')

    def post(self,request):
        order = {
            'name': request.POST.get('name'),
            'model': request.POST.get('model'),
            'addr': request.POST.get('addr'),
            'tel': request.POST.get('tel'),
            'note': request.POST.get('note')
        }
        models.Order.objects.create(**order)

        return redirect('/')