from functools import lru_cache
from pathlib import Path

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    PYTHON_ENV: str = "production"
    BASE_DIR: Path = Path(__file__).parent.parent
    GOOGLE_MAPS_API_KEY: str

    @computed_field
    @property
    def IN_PRODUCTION(self) -> bool:
        return self.PYTHON_ENV == "production"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
