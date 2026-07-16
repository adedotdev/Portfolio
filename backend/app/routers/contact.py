import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.core.config import settings

router = APIRouter()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


@router.post("/contact")
def send_contact_message(payload: ContactRequest) -> dict[str, str]:
    resend.api_key = settings.resend_api_key
    try:
        resend.Emails.send(
            {
                "from": settings.contact_from_email,
                "to": settings.contact_to_email,
                "reply_to": payload.email,
                "subject": f"Portfolio contact from {payload.name}",
                "text": f"From: {payload.name} <{payload.email}>\n\n{payload.message}",
            }
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Failed to send message") from exc
    return {"status": "sent"}
