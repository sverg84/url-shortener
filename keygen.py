from crud import get_url_by_key
from random import choices
from string import ascii_letters, digits, punctuation
from typing import Dict


def random_key(length: int) -> str:
    return ''.join(choices(ascii_letters + digits + punctuation, k=length))


def unique_random_key(length: int) -> str:
    key: str = random_key(length)
    while get_url_by_key(url_key=key) is not None:
        key = random_key(length)
    return key