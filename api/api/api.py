from fastapi import FastAPI

app = FastAPI(
    title="Banyuhay",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)


@app.get("/")
def index():
    return b"ok"


@app.get("/api/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
