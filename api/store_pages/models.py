from django.db import models
from djchoices import DjangoChoices, ChoiceItem


class Product(models.Model):

    class ProductStatusChoices(DjangoChoices):
        active = ChoiceItem('active', label='действующий')
        archive = ChoiceItem('archive', label='архивный')

    title = models.CharField('Название', max_length=100, blank=True)
    prize = models.DecimalField('Цена, руб', null=True, default=0,
                                max_digits=9, decimal_places=2)
    description = models.TextField('Описание продукта')
    image = models.ImageField('Картинка', upload_to='images/',
                              blank=True, null=True)
    status = models.CharField('Статус', choices=ProductStatusChoices.choices,
                              max_length=50,
                              default=ProductStatusChoices.active)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
# Create your models here.
