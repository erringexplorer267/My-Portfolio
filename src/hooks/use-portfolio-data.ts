"use client";

import { useState, useEffect } from "react";

export function usePortfolioData(initialSkills: any[] = [], initialProjects: any[] = []) {
  const [skills, setSkills] = useState<any[]>(initialSkills);
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [journeys, setJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(initialSkills.length === 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/portfolio");
        
        if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
          const { skills: skillsData, projects: projectsData, journeys: journeyData } = await res.json();
          setSkills(Array.isArray(skillsData) ? skillsData : []);
          setProjects(Array.isArray(projectsData) ? projectsData : []);
          setJourneys(Array.isArray(journeyData) ? journeyData : []);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return { skills, projects, journeys, loading, setSkills, setProjects, setJourneys };
}
