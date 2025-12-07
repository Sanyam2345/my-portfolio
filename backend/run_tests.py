import subprocess

try:
    result = subprocess.run([".\\venv\\Scripts\\pytest", "-v"], capture_output=True, text=True)
    print("STDOUT:", result.stdout)
    print("STDERR:", result.stderr)
except Exception as e:
    print(e)
