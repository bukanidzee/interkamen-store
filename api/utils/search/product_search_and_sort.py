from django.db.models import Case, When, Q, F

from store_pages.models import Product
from orders.models import Item
from .search_and_needed import search_and_needed


def filter_choosed_products_with_status(user, status):
    list_of_choosed = Item.objects.filter(order__status='current',
                                          order__owner=user).values_list(
                                          'product_id', flat=True)

    return Product.objects.exclude(
        id__in=list_of_choosed).filter(
        status=status
    )


def search_products(query, user, status):

    qs = filter_choosed_products_with_status(user, status)
    if len(query) == 0:
        return qs

    search, needed = search_and_needed(query)

    qs = qs.annotate(
            entries=Case(
                When((Q(title__icontains=search[0])
                      | Q(description__icontains=search[0])),
                     then=1),
                default=0
             ),
        )

    for word in search[1:]:
        qs = qs.annotate(
                    entries=Case(
                        When((Q(title__icontains=word)
                              | Q(description__icontains=word)),
                             then=F('entries')+1),
                     ),
        )

    return qs.filter(entries__gte=needed)


def sorted_and_searched_products(query, sort, user, status):
    searched_products = search_products(query, user, status)

    if sort:
        return searched_products.order_by(sort)
    else:
        return searched_products
