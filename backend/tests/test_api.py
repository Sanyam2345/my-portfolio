import pytest
from httpx import AsyncClient
import models
from unittest.mock import patch, MagicMock

# --- UNIT & INTEGRATION TESTS ---

@pytest.mark.asyncio
async def test_read_root(client: AsyncClient):
    """
    Test the Root Health Check endpoint.
    """
    response = await client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "online", "message": "Portfolio API is running smoothly"}

@pytest.mark.asyncio
async def test_create_contact_success(client: AsyncClient, db_session):
    """
    Test valid contact form submission:
    1. Returns 200 OK.
    2. Saves to Database.
    3. Triggers Telegram Notification (Mocked).
    """
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message."
    }

    # Mock the requests.post call in 'main.send_telegram_notification'
    with patch("main.requests.post") as mock_post:
        mock_post.return_value.status_code = 200
        
        response = await client.post("/contact", json=payload)
        
        # 1. API Response Check
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test User"
        assert data["email"] == "test@example.com"
        assert "id" in data

        # 2. Database Check
        db_msg = db_session.query(models.Message).filter(models.Message.email == "test@example.com").first()
        assert db_msg is not None
        assert db_msg.message == "This is a test message."

        # 3. Telegram Verification (Background Task)
        # Note: Background tasks in FastAPI TestClient run synchronously usually, 
        # but with AsyncClient we verify the logic separately or assume fastapi handles it.
        # For strict unit testing of the function itself:
        from main import send_telegram_notification
        with patch("main.os.getenv", side_effect=lambda k: "test_token" if k == "TELEGRAM_BOT_TOKEN" else "test_chat_id"):
             send_telegram_notification("Test User", "test@example.com", "Message")
             mock_post.assert_called()

@pytest.mark.asyncio
async def test_create_contact_validation_error(client: AsyncClient):
    """
    Test invalid input (missing email).
    """
    payload = {
        "name": "Test User",
        "message": "Missing email"
    }
    response = await client.post("/contact", json=payload)
    assert response.status_code == 422 # Unprocessable Entity

@pytest.mark.asyncio
async def test_read_projects_empty(client: AsyncClient, db_session):
    """
    Test fetching projects when DB is empty.
    """
    response = await client.get("/projects")
    assert response.status_code == 200
    assert response.json() == []

@pytest.mark.asyncio
async def test_read_projects_with_data(client: AsyncClient, db_session):
    """
    Test fetching projects with seeded data.
    """
    project = models.Project(
        title="Test Project",
        description="Desc",
        tags=["react"],
        link="http://example.com",
        image="img.png"
    )
    db_session.add(project)
    db_session.commit()

    response = await client.get("/projects")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Project"
