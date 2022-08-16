from rest_framework.permissions import BasePermission


class IsGETOrAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        else:
            return request.user.is_staff
