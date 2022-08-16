from rest_framework.permissions import BasePermission
from utils.permission_cases import (staff_order_patch_case,
                                    creator_order_patch_case)


class IsCreatorOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'owner'):
            return (request.user == obj.owner) or request.user.is_staff
        else:
            return (request.user == obj.order.owner) or request.user.is_staff


class IsOrderStaffActionsAllowed(BasePermission):
    def has_permission(self, request, view):
        status = request.GET.get('status', '')
        if request.user.is_staff and status == 'current':
            return False
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if request.method == 'PATCH' or request.method == 'PUT':
            if request.user.is_staff:
                return staff_order_patch_case(request.data['status'],
                                              obj.status)
            else:
                return creator_order_patch_case(request.data['status'],
                                                obj.status)
        elif request.method == 'DELETE':
            return request.user.is_staff
        else:
            return True


class IsItemStaffActionsAllowed(BasePermission):
    # def has_permission(self, request, view):

    def has_object_permission(self, request, view, obj):
        if request.method != 'GET':
            if obj.order.status == 'current':
                return request.user == obj.order.owner
            elif obj.order.status in ['processing', 'transporting']:
                return request.user.is_staff
            else:
                return False
        else:
            return True
