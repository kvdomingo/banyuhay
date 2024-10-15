from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles

from api.routes import reviews, toilets
from api.settings import settings

app = FastAPI(
    title="Banyuhay",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    default_response_class=ORJSONResponse,
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


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
