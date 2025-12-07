import pytest
import asyncio
from httpx import AsyncClient
from main import app
import time

@pytest.mark.asyncio
async def test_high_concurrency_contact(client: AsyncClient, db_session):
    """
    Stress Test: Simulate 50 concurrent contact form submissions.
    Ensures the backend remains responsive and handles database locking.
    """
    payload = {
        "name": "Stress User",
        "email": "stress@example.com",
        "message": "Stress test message."
    }

    start_time = time.time()
    
    # Create 50 concurrent requests
    tasks = [client.post("/contact", json=payload) for _ in range(50)]
    responses = await asyncio.gather(*tasks)

    end_time = time.time()
    total_time = end_time - start_time

    # Verification
    failed = 0
    for r in responses:
        if r.status_code != 200:
            failed += 1
    
    print(f"\n--- Performance Result ---")
    print(f"Total Requests: 50")
    print(f"Failed: {failed}")
    print(f"Total Time: {total_time:.2f}s")
    print(f"RPS: {50/total_time:.2f}")
    
    assert failed == 0, f"{failed} requests failed under load"
    assert total_time < 5.0, "API is too slow (aiming for >10 RPS)"
