from tables import URL

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