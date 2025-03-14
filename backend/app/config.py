import os
from pydantic_settings import BaseSettings
from pydantic import field_validator, EmailStr
from typing import List, Dict, Optional, Union

class Settings(BaseSettings):
    # Base settings
    ENVIRONMENT: str = "development"
    
    # Database settings
    DATABASE_URL: str
    
    # API Keys
    OPENAI_API_KEY: Optional[str] = None
    GROQ_API_KEY: str
    EMAIL_SERVICE_API_KEY: Optional[str] = None
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    
    # Email settings
    FROM_EMAIL: EmailStr = "noreply@example.com"
    FROM_NAME: str = "Insurance Specialist"
    CONTACT_PHONE: str = "(555) 123-4567"
    
    # CORS settings
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:3000"]
    
    @field_validator("CORS_ORIGINS")
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return v.split(",")
        return v
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Create settings instance
settings = Settings()
