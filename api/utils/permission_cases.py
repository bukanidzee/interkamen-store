def staff_order_patch_case(req_status, obj_status):
    return req_status != 'current' and obj_status != 'current'


def creator_order_patch_case(req_status, obj_status):
    creator_allowed = {'current': 'processing',
                       'processing': 'dropped'}
    if obj_status in creator_allowed:
        return creator_allowed[obj_status] == req_status
    else:
        return False
