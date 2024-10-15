from starlette.responses import FileResponse, Response
from starlette.staticfiles import StaticFiles
from starlette.types import Scope

from api.settings import settings


class StaticFilesMiddleware(StaticFiles):
    async def get_response(self, path: str, _: Scope) -> Response:
        immutable_subdirs = ["assets", "chunks", "entry", "nodes"]
        static_file_path = settings.STATICFILES_DIR / path
        if path != ".":
            if static_file_path.exists():
                return FileResponse(static_file_path)

            for d in immutable_subdirs:
                subdir_path = settings.STATICFILES_DIR / f"_app/immutable/{d}" / path
                if subdir_path.exists():
                    return FileResponse(subdir_path)

            return FileResponse(settings.STATICFILES_DIR / "index.html")

        return FileResponse(settings.STATICFILES_DIR / "index.html")
