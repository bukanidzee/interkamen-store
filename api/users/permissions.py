from rest_framework.permissions import BasePermission


class IsYourselfOrAdmin(BasePermission):
    # def has_permission(self, request, view):
    #

    def has_object_permission(self, request, view, obj):
        if request.method in ['PUT', 'PATCH']:
            return request.user == obj
        else:
            return request.user.is_staff or request.user == obj
