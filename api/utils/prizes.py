from functools import reduce


def get_order_total_prize(order):
    return reduce(lambda sum, item: sum + item.prize,
                  order.items.all(),
                  0)
