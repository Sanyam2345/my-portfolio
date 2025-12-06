import requests
import sys

def test_contact():
    url = "http://127.0.0.1:8000/contact"
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message from debugging script."
    }
    try:
        print(f"Sending POST request to {url}...")
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        if response.status_code == 200:
            print("✅ Success: Backend is working.")
        else:
            print("❌ Error: Backend returned non-200 status.")
    except Exception as e:
        print(f"❌ Connection Failed: {e}")
        print("Make sure the backend is running: 'uvicorn main:app --reload'")

if __name__ == "__main__":
    test_contact()
