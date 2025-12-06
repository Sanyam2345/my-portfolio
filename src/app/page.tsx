import { Hero } from "@/components/hero";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/navbar";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { About } from "@/components/about";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";

// Helper to fetch projects on server
async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-white">
      <Navbar />
      <ThemeToggle />
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
