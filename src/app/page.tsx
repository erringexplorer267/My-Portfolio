import { headers } from "next/headers";
import { MainContent } from "@/components/main-content";
import { DashboardToggle } from "@/components/dashboard-panel";

async function getPortfolioData() {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    
    const res = await fetch(`${protocol}://${host}/api/portfolio`, {
      cache: "no-store",
    });
    
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Error fetching portfolio data from API:", error);
  }
  
  return { skills: [], projects: [] };
}

export default async function Home() {
  const { skills, projects } = await getPortfolioData();

  return (
    <main className="relative min-h-screen">
      <DashboardToggle />
      <MainContent initialSkills={skills} initialProjects={projects} />
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-accent-1/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] bg-accent-2/5 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
