from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    cors_origins: list[str] = ["http://localhost:3000"]
    resend_api_key: str = ""
    contact_to_email: str = "damidenuga16@gmail.com"
    contact_from_email: str = "Portfolio Contact <onboarding@resend.dev>"

    class Config:
        env_file = ".env"


settings = Settings()
