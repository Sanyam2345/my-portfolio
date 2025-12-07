import pytest
from httpx import AsyncClient
import models

@pytest.mark.asyncio
async def test_sql_injection_attempt(client: AsyncClient, db_session):
    """
    Security Test: Attempt SQL Injection in Contact Form.
    The ORM should escape this and save it literally, NOT execute it.
    """
    payload = {
        "name": "Hacker",
        "email": "hacker@example.com",
        "message": "'; DROP TABLE messages; --"
    }
    
    response = await client.post("/contact", json=payload)
    assert response.status_code == 200
    
    # Verify the table still exists and message was saved literally
    db_msg = db_session.query(models.Message).filter(models.Message.email == "hacker@example.com").first()
    assert db_msg.message == "'; DROP TABLE messages; --"

@pytest.mark.asyncio
async def test_xss_payload(client: AsyncClient, db_session):
    """
    Security Test: Attempt XSS Payload.
    The backend should save it, but we satisfy verified that it's treated as data.
    """
    payload = {
        "name": "<script>alert('XSS')</script>",
        "email": "xss@example.com",
        "message": "Stealing cookies..."
    }
    
    response = await client.post("/contact", json=payload)
    assert response.status_code == 200
    
    db_msg = db_session.query(models.Message).filter(models.Message.email == "xss@example.com").first()
    assert db_msg.name == "<script>alert('XSS')</script>" 
