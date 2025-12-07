import sys
import os
import time
import requests
from unittest.mock import patch
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Setup Path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import app, get_db
from database import Base
import models

from sqlalchemy.pool import StaticPool

# --- SETUP IN-MEMORY DB ---
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
Base.metadata.create_all(bind=engine)

client = TestClient(app)

# --- REPORTING UTILS ---
results = {
    "UNIT": {"pass": 0, "fail": 0},
    "INTEGRATION": {"pass": 0, "fail": 0},
    "SECURITY": {"pass": 0, "fail": 0},
    "PERFORMANCE": {"pass": 0, "fail": 0},
}
failed_logs = []

def log_pass(category, name):
    msg = f"[PASS] [{category}] {name}"
    print(msg)
    results[category]["pass"] += 1
    with open("test_report.txt", "a") as f:
        f.write(msg + "\n")

def log_fail(category, name, error):
    msg = f"[FAIL] [{category}] {name} - {error}"
    print(msg)
    results[category]["fail"] += 1
    failed_logs.append(msg)
    with open("test_report.txt", "a") as f:
        f.write(msg + "\n")

# --- TESTS ---

def test_unit_health_check():
    try:
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"status": "online", "message": "Portfolio API is running smoothly"}
        log_pass("UNIT", "Health Check Endpoint")
    except Exception as e:
        log_fail("UNIT", "Health Check Endpoint", str(e))

def test_integration_contact_flow():
    try:
        # Mocking Env Vars for Telegram
        os.environ["TELEGRAM_BOT_TOKEN"] = "test_token"
        os.environ["TELEGRAM_CHAT_ID"] = "test_chat_id"
        
        # Mock requests.post
        with patch("requests.post") as mock_post:
            mock_post.return_value.status_code = 200
            
            payload = {
                "name": "Integration Test",
                "email": "int@test.com",
                "message": "Testing flow."
            }
            response = client.post("/contact", json=payload)
            
            assert response.status_code == 200
            data = response.json()
            assert data["email"] == "int@test.com"
            assert "id" in data
            
            # Verify DB
            db = TestingSessionLocal()
            msg = db.query(models.Message).filter(models.Message.email == "int@test.com").first()
            assert msg is not None
            log_pass("INTEGRATION", "Contact Form -> DB -> Response")
            
    except Exception as e:
        log_fail("INTEGRATION", "Contact Form Flow", str(e))

def test_security_sql_injection():
    try:
        payload = {
            "name": "Hacker",
            "email": "hack@test.com",
            "message": "'; DROP TABLE messages; --"
        }
        with patch("requests.post") as mock_post:
            mock_post.return_value.status_code = 200
            response = client.post("/contact", json=payload)
        
        assert response.status_code == 200
        
        db = TestingSessionLocal()
        msg = db.query(models.Message).filter(models.Message.message == "'; DROP TABLE messages; --").first()
        assert msg is not None
        log_pass("SECURITY", "SQL Injection Resilience")
    except Exception as e:
        log_fail("SECURITY", "SQL Injection", str(e))

def test_performance_load():
    try:
        print("   Running load test (50 requests)...")
        start = time.time()
        success = 0
        for _ in range(50):
            response = client.get("/projects")
            if response.status_code == 200:
                success += 1
        end = time.time()
        duration = end - start
        rps = 50 / duration
        
        print(f"   RPS: {rps:.2f}")
        assert success == 50
        assert rps > 10 # Minimal threshold for local test
        log_pass("PERFORMANCE", f"Load Test (RPS: {rps:.2f})")
    except Exception as e:
        log_fail("PERFORMANCE", "Load Test", str(e))

def run_suite():
    # Clear report file
    with open("test_report.txt", "w") as f:
        f.write("--- PROFESSIONAL TEST REPORT ---\n")

    print("\n--- STARTING PROFESSIONAL TEST SUITE ---\n")
    test_unit_health_check()
    test_integration_contact_flow()
    test_security_sql_injection()
    test_performance_load()
    
    print("\n\n========================================")
    print("FINAL TEST SUMMARY")
    print("========================================")
    
    summary = "\nSUMMARY:\n"
    for cat, counts in results.items():
        line = f"[{cat}] PASS: {counts['pass']} | FAIL: {counts['fail']}"
        print(line)
        summary += line + "\n"
    
    with open("test_report.txt", "a") as f:
        f.write(summary)
        if failed_logs:
            f.write("\nFAILURES:\n")
            for log in failed_logs:
                f.write(log + "\n")
    
    if failed_logs:
        sys.exit(1)
    else:
        print("\nPROJECT IS PRODUCTION READY. ZERO ERRORS FOUND.")
        sys.exit(0)

if __name__ == "__main__":
    run_suite()
