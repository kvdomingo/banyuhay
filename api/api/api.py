from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

from api.routes import toilets

app = FastAPI(
    title="Banyuhay",
    version="0.1.0",
    docs_url="/",
    redoc_url="/redoc",
    default_response_class=ORJSONResponse,
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


app.include_router(toilets.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
