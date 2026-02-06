import uvicorn
import os
import sys
import threading
import time
import urllib.request
import json

# Set dummy env vars for testing if not set
if "DATABASE_URL" not in os.environ:
    os.environ["DATABASE_URL"] = "sqlite:///./test_deployment.db"
if "TELEGRAM_BOT_TOKEN" not in os.environ:
    os.environ["TELEGRAM_BOT_TOKEN"] = "dummy_token"
if "TELEGRAM_CHAT_ID" not in os.environ:
    os.environ["TELEGRAM_CHAT_ID"] = "dummy_id"

def start_server():
    try:
        from main import app
        # Run on a different port to avoid conflicts
        uvicorn.run(app, host="127.0.0.1", port=8999, log_level="warning")
    except Exception as e:
        print(f"Server start failed: {e}")
        os._exit(1)

def check_server():
    time.sleep(5)  # Wait for startup
    try:
        with urllib.request.urlopen("http://127.0.0.1:8999/") as response:
            if response.getcode() == 200:
                print("Production simulation check: SUCCESS")
                body = response.read().decode('utf-8')
                print(f"Response: {body}")
                os._exit(0)
            else:
                print(f"Production simulation check: FAILED (Status {response.getcode()})")
                os._exit(1)
    except Exception as e:
        print(f"Production simulation check: EXCEPTION ({e})")
        os._exit(1)

if __name__ == "__main__":
    sys.path.append(os.getcwd()) # Ensure generated path is in python path
    t = threading.Thread(target=start_server)
    t.daemon = True
    t.start()
    check_server()
