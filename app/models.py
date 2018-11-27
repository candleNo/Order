from django.db import models

# Create your models here.

class Order(models.Model):
    STATUS = (
        ('0', 'doing'),
        ('1', 'complete'),
        ('2', 'failure')
    )

    name = models.CharField(max_length=16)
    model = models.CharField(max_length=16)
    addr = models.CharField(max_length=128)
    tel = models.CharField(max_length=11)
    note = models.CharField(max_length=128,blank=True)
    time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=2,choices=STATUS,default='0')