# url_shortener

## Overview
This is a demonstration of my learning/using Python and TypeScript in order to create a program that converts a URL into a randomly-generated string key to append to the "shortened URL domain"—in this case, it would be `localhost:8000`. This was originally inspired by [this guide](https://realpython.com/build-a-python-url-shortener-with-fastapi/) but deviates from the guide in quite a few ways. For one, the Python implementation replaces the SQLAlchemy approach with Piccolo and PostgreSQL.

Also, this project also includes a Google Chrome extension for using the Python app via `POST` requests, albeit unpacked since 

The techonologies/languages I learned to create this are:
* Python
  * [FastAPI](https://fastapi.tiangolo.com/lo/)
  * [Piccolo](https://piccolo-orm.readthedocs.io/en/latest/index.html)
  * [PostgreSQL](https://www.postgresql.org/)
* JavaScript/TypeScript
  * [Node.js](https://nodejs.org/en/docs)
  * [Google Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/)
  * [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Setup

### Install requirements

```bash
pip install -r requirements.txt
```

### Getting started guide

To activate the Python app, run this in Terminal:

```bash
python main.py
```

then follow [this guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) to load the unpacked extension into your Chrome browser—the extension root directory to load should be `extension/`—and the extension should be visible and usable via the right-click context menu, replete with clipboard write and notification banners.

https://github.com/sverg84/url-shortener/assets/134344913/bf2ef051-8de1-4dcb-8f65-b6639883cb46
