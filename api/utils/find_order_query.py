from orders.models import Order
from users.models import CustomUser
from django.db.models import Q, Sum


# def get_or_create_current_order(owner):
#     return [Order.objects.get_or_create(owner=owner, status='current')[0]]


def get_staff_queryset(request, status):
    check_user = request.GET.get('userId', '')
    if check_user:
        check_user = CustomUser.objects.get(id=int(check_user))
        return Order.objects.filter(Q(owner=check_user) & Q(status=status))
    else:
        return Order.objects.filter(status=status)


def filtered_order_query(request, status):
    if request.user.is_staff:
        return get_staff_queryset(request, status)
    # elif status == 'current':
    #     return get_or_create_current_order(request.user)
    else:
        return Order.objects.filter(Q(owner=request.user) & Q(status=status))


def annotate_orders_with_total_prize(queryset):
    return queryset.annotate(total_prize=Sum('items__prize'))


def sorted_order_query(queryset, sort):
    if sort == 'prize_plus':
        queryset = annotate_orders_with_total_prize(queryset)
        return queryset.order_by('total_prize')
    elif sort == 'prize_minus':
        queryset = annotate_orders_with_total_prize(queryset)
        return queryset.order_by('-total_prize')
    elif sort == 'created_plus':
        return queryset.order_by('-created')
    elif sort == 'created_minus':
        return queryset.order_by('created')
    elif sort == 'finished_plus':
        return queryset.order_by('-finished')
    elif sort == 'finished_minus':
        return queryset.order_by('finished')


def get_order_list_queryset(request):
    status = request.GET.get('status')
    sort = request.GET.get('sort', '')
    if sort:
        return sorted_order_query(filtered_order_query(request,
                                                       status), sort)
    else:
        return filtered_order_query(request, status)
