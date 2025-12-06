from backend.database import SessionLocal, engine
from backend.models import Base, Project

# Create tables if not exist (redundant if main.py runs, but good for standalone seed)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

projects = [
    {
        "title": "Neon AI Assistant",
        "description": "A futuristic AI chat interface with 3D holographic elements and real-time voice processing.",
        "tags": "Next.js,Three.js,OpenAI,Tailwind",
        "link": "#",
        "image": "https://placehold.co/600x400/7c3aed/ffffff?text=Neon+AI"
    },
    {
        "title": "Cyberpunk Commerce",
        "description": "Modern e-commerce platform featuring dark mode, crypto payments, and immersive product views.",
        "tags": "React,Stripe,Solidity,Framer Motion",
        "link": "#",
        "image": "https://placehold.co/600x400/0891b2/ffffff?text=Cyberpunk"
    },
    {
        "title": "Data Nexus",
        "description": "Real-time data visualization dashboard for complex datasets with interactive 3D graphs.",
        "tags": "D3.js,WebGL,TypeScript,Python",
        "link": "#",
        "image": "https://placehold.co/600x400/db2777/ffffff?text=Data+Nexus"
    }
]

def seed():
    # Check if data exists
    if db.query(Project).first():
        print("Database already seeded.")
        return

    for project_data in projects:
        project = Project(**project_data)
        db.add(project)
    
    db.commit()
    print("Seeded projects successfully.")
    db.close()

if __name__ == "__main__":
    seed()
