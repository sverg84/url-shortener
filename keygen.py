from random import choices
from string import ascii_letters, digits, punctuation
from typing import Dict


def random_key(model: Dict, key: str, length: int) -> str:
    maybe_value: str | None = model.get(key)
    if (maybe_value is not None):
        return maybe_value
    return ''.join(choices(ascii_letters + digits + punctuation, k=length))