import math


def search_and_needed(query):

    search = set(map(lambda word: word.lower(), query.split(' ')))
    needed = math.ceil(len(search)/2) if math.ceil(len(search)/2) else 1
    search = list(search)

    return search, needed
