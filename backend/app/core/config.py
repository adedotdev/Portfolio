from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"


settings = Settings()
