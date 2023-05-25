from fastapi import FastAPI

import schemas

app = FastAPI()

@app.get("/")
def read_root() -> str: 
    return "I want snax"

@app.post("/url")
def create_url(url: schemas.URLBase) -> str:
    return url.__str__