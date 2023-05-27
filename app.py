from endpoints import HomeEndpoint
from fastapi import FastAPI
from fastapi.responses import JSONResponse, RedirectResponse
from piccolo_admin.endpoints import create_admin
from piccolo_api.crud.serializers import create_pydantic_model
from piccolo_app import APP_CONFIG
from piccolo.engine import engine_finder
from starlette.routing import Route, Mount
from starlette.staticfiles import StaticFiles
from tables import URL
from typing import Dict, List


app = FastAPI(
    routes=[
        Route("/", HomeEndpoint),
        Mount(
            "/admin/",
            create_admin(
                tables=APP_CONFIG.table_classes,
                # Required when running under HTTPS:
                # allowed_hosts=['my_site.com']
            ),
        ),
        Mount("/static/", StaticFiles(directory="static")),
    ],
)


URLModelIn: Dict = create_pydantic_model(table=URL, model_name="URLModelIn")
URLModelOut: Dict = create_pydantic_model(
    table=URL, include_default_columns=True, model_name="URLModelOut"
)


@app.get("/urls/", response_model=List[URLModelOut])
async def urls():
    return await URL.select().order_by(URL.id)


@app.get("/{url_key}")
async def forward_to_target_url(url_key: str):
    from crud import get_url_by_key
    if (db_url := await get_url_by_key(url_key)) is not None:
        return RedirectResponse(db_url)
    return JSONResponse({}, status_code=404)


@app.post("/urls/", response_model=URLModelOut)
async def create_url(url_model: URLModelIn):
    from crud import create_db_url
    url = URL(**(await create_db_url(url_model)))
    await url.save()
    return url.to_dict()


@app.put("/urls/{url_id}/", response_model=URLModelOut)
async def update_url(url_id: int, url_model: URLModelIn):
    url = await URL.objects().get(URL.id == url_id)
    if not url:
        return JSONResponse({}, status_code=404)

    for key, value in url_model.dict().items():
        setattr(url, key, value)

    await url.save()

    return url.to_dict()


@app.delete("/urls/{url_id}/")
async def delete_url(url_id: int):
    url = await URL.objects().get(URL.id == url_id)
    if not url:
        return JSONResponse({}, status_code=404)

    await url.remove()

    return JSONResponse({})


@app.on_event("startup")
async def open_database_connection_pool():
    try:
        engine = engine_finder()
        await engine.start_connection_pool()
    except Exception:
        print("Unable to connect to the database")


@app.on_event("shutdown")
async def close_database_connection_pool():
    try:
        engine = engine_finder()
        await engine.close_connection_pool()
    except Exception:
        print("Unable to connect to the database")
