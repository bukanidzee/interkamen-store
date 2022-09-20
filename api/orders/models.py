from decimal import Decimal

from django.db import models
from django.utils import timezone
from django_lifecycle import (LifecycleModelMixin,
                              hook,
                              BEFORE_UPDATE,
                              BEFORE_SAVE)
# from django.urls import reverse

from djchoices import DjangoChoices, ChoiceItem


class Order(LifecycleModelMixin, models.Model):

    class StatusChoices(DjangoChoices):
        current = ChoiceItem('current', label='текущий')
        processing = ChoiceItem('processing', label='в обработке')
        transporting = ChoiceItem('transporting', label='в доставке')
        closed = ChoiceItem('closed', label='завершенный')
        dropped = ChoiceItem('dropped', label='отмененный')

    owner = models.ForeignKey('users.CustomUser', related_name='orders',
                              on_delete=models.CASCADE, verbose_name='Хозяин')
    created = models.DateTimeField('Создано',
                                   blank=True,
                                   null=True)

    status = models.CharField('Статус', choices=StatusChoices.choices,
                              max_length=50,
                              default=StatusChoices.current)
    finished = models.DateTimeField('Время завершения',
                                    blank=True,
                                    null=True)

    @hook(BEFORE_UPDATE, when='status', was='current', is_not='current')
    def order_officially_created(self):
        self.created = timezone.now()

    @hook(BEFORE_UPDATE, when='status', has_changed=True)
    def is_order_finished(self):
        if self.status in ['closed', 'dropped']:
            self.finished = timezone.now()

    class Meta:
        ordering = ['-created']

    @staticmethod
    def format_time(time_to_format):
        if time_to_format:
            return time_to_format.strftime('%d.%m.%Y')
        else:
            return ''

    def __str__(self):
        if self.status == 'current':
            postfact = ''
        elif self.status == 'processing' or self.status == 'transporting':
            postfact = 'created ' + self.format_time(self.created)
        elif self.status == 'closed' or self.status == 'dropped':
            postfact = 'finished ' + self.format_time(self.finished)

        return '{} {} order {} with id={}'.format(self.status,
                                                  self.owner,
                                                  postfact,
                                                  str(self.id))

        # def save(self, *args, **kwargs):
        #     if self.id:
        #         oldobj = Order.objects.get(id=self.id)
        #
        #         if oldobj.status == 'current' and self.status != 'current':
        #             self.created = timezone.now()
        #
        #         if self.status in ['closed', 'dropped']:
        #             self.finished = timezone.now()
        #
        #     super().save(*args, **kwargs)


class Item(LifecycleModelMixin, models.Model):
    product = models.ForeignKey('store_pages.Product', related_name='items',
                                on_delete=models.CASCADE,
                                verbose_name='Продукт')
    order = models.ForeignKey('Order', related_name='items',
                              on_delete=models.CASCADE, verbose_name='Заказ',
                              editable=False)
    quantity = models.PositiveSmallIntegerField('Количество')
    prize = models.DecimalField('Цена, руб', null=True, default=0,
                                max_digits=9, decimal_places=2)

    @hook(BEFORE_SAVE)
    def count_prize(self):
        self.prize = Decimal(self.product.prize*self.quantity)

    class Meta:
        unique_together = ['order', 'product', ]

    def __str__(self):
        return self.order.__str__() + ' item on prize' + str(self.prize)
