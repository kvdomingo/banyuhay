from datetime import timedelta

from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

from app.routes import auth, reviews, toilets
from app.settings import settings

app = FastAPI(
    title="Banyuhay",
    version="0.1.0",
    root_path="/api",
    docs_url="/docs",
    redoc_url="/redoc",
    default_response_class=ORJSONResponse,
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


app.include_router(auth.router)
app.include_router(toilets.router)
app.include_router(reviews.router)


if settings.IN_PRODUCTION:
    app.mount(
        "/",
        StaticFiles(directory=settings.STATICFILES_DIR, html=True),
        name="static",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
