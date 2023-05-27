from crud import get_url_by_key
from random import choices
from string import ascii_letters, digits


def random_key(length: int) -> str:
    return ''.join(choices(ascii_letters + digits, k=length))


async def unique_random_key(length: int) -> str:
    key: str = random_key(length)
    while await get_url_by_key(url_key=key) is not None:
        key = random_key(length)
    return key