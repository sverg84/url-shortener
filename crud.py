from app import URLModelIn
from keygen import random_key, unique_random_key
from tables import URL
from typing import Dict


def create_db_url(url_model: URLModelIn) -> Dict:
    url_model_as_dict: Dict = url_model.dict()

    key_from_model: str | None = url_model_as_dict.get("key")
    secret_key_from_model: str | None = url_model_as_dict.get("secret_key")

    key: str = unique_random_key(length=8) if key_from_model is None else key_from_model
    url_model_as_dict.update({
        "key": key,
        "secret_key": (
            f"{key}_{random_key(length=10)}"
            if secret_key_from_model is None else secret_key_from_model
        )
    })
    return url_model_as_dict


async def get_url_by_key(url_key: str) -> str | None:
    maybe_entry = await (
        URL.select(URL.target_url)
        .where(URL.key == url_key)
        .where(URL.is_active.eq(True))
        .first()
    )

    return (
        maybe_entry.get("target_url") 
        if maybe_entry is not None else None
    )