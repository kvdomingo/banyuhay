from functools import lru_cache
from pathlib import Path

from pydantic import PostgresDsn, computed_field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PYTHON_ENV: str = "production"
    BASE_DIR: Path = Path(__file__).parent.parent

    POSTGRESQL_USERNAME: str
    POSTGRESQL_PASSWORD: str
    POSTGRESQL_DATABASE: str

    @computed_field
    @property
    def IN_PRODUCTION(self) -> bool:
        return self.PYTHON_ENV == "production"

    @computed_field
    @property
    def DATABASE_PARAMETERS(self) -> dict[str, str | int]:
        return {
            "host": "db",
            "port": 5432,
            "username": self.POSTGRESQL_USERNAME,
            "password": self.POSTGRESQL_PASSWORD,
            "path": self.POSTGRESQL_DATABASE,
        }

    @computed_field
    @property
    def ASYNC_DATABASE_URL(self) -> str:
        return str(
            PostgresDsn.build(
                **self.DATABASE_PARAMETERS,
                scheme="postgresql+asyncpg",
            )
        )

    @computed_field
    @property
    def SYNC_DATABASE_URL(self) -> str:
        return str(
            PostgresDsn.build(
                **self.DATABASE_PARAMETERS,
                scheme="postgresql+psycopg2",
            )
        )


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
