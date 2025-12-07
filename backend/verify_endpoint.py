import requests
import time

url = "https://my-portfolio-vmas.onrender.com/contact"
payload = {
    "name": "Production Verification",
    "email": "verify@example.com",
    "message": "Testing the final smtplib implementation."
}

try:
    print(f"Sending POST to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        print("✅ Request accepted! Check backend logs for SMTP output.")
    else:
        print("❌ Request failed.")
except Exception as e:
    print(f"❌ Error: {e}")
