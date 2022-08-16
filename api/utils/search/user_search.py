from django.db.models import Case, When, Q, F

from users.models import CustomUser
from .search_and_needed import search_and_needed


def search_users(query):

    qs = CustomUser.objects.all()
    if len(query) == 0:
        return qs

    search, needed = search_and_needed(query)

    qs = qs.annotate(
            entries=Case(
                When((Q(username__icontains=search[0])
                      | Q(first_name__icontains=search[0])
                      | Q(last_name__icontains=search[0])
                      | Q(third_name__icontains=search[0])),
                     then=1),
                default=0
             ),
        )

    for word in search[1:]:
        qs = qs.annotate(
                    entries=Case(
                        When((Q(username__icontains=word)
                              | Q(first_name__icontains=word)
                              | Q(last_name__icontains=word)
                              | Q(third_name__icontains=word)),
                             then=F('entries')+1),
                     ),
        )

    return qs.filter(entries__gte=needed)
