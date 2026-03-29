from datetime import timedelta

from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles
from scalar_fastapi import get_scalar_api_reference
from starlette.middleware.sessions import SessionMiddleware

from app.routes import auth, reviews, toilets
from app.settings import settings

app = FastAPI(
    title="Banyuhay",
    version="0.1.0",
    root_path="/api",
    docs_url=None,
    redoc_url=None,
    default_response_class=ORJSONResponse,
    swagger_ui_parameters={
        "persistAuthorization": True,
    },
)


app.add_middleware(
    SessionMiddleware,
    session_cookie="session",
    secret_key=settings.SECRET_KEY,
    max_age=int(timedelta(days=7).total_seconds()),
    path="/",
    same_site="strict",
    https_only=settings.IN_PRODUCTION,
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/docs")
async def docs():
    return get_scalar_api_reference(openapi_url=app.openapi_url)


app.include_router(auth.router)
app.include_router(toilets.router)
app.include_router(reviews.router)


if settings.IN_PRODUCTION:
    app.mount(
        "/",
        StaticFiles(directory=settings.STATICFILES_DIR, html=True),
        name="static",
    )
