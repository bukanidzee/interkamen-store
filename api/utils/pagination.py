from rest_framework.pagination import PageNumberPagination


class PageLimitPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100


# from django.core.paginator import InvalidPage
# from rest_framework.exceptions import NotFound
# class PageLimitWithoutChoosedPagination(PageLimitPagination):
#     def paginate_queryset(self, queryset, request, view=None):
#         page_size = self.get_page_size(request)
#         if not page_size:
#             return None
#
#         paginator = self.django_paginator_class(queryset, page_size)
#         page_number = self.get_page_number(request, paginator)
#
#         try:
#             self.page = paginator.page(page_number)
#         except InvalidPage as exc:
#             msg = self.invalid_page_message.format(
#                 page_number=page_number, message=str(exc)
#             )
#             raise NotFound(msg)
#
#         if paginator.num_pages > 1 and self.template is not None:
#             # The browsable API should display pagination controls.
#             self.display_page_controls = True
#
#         self.request = request
#         return list(self.page)
