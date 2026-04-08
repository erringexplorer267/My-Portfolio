export interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  github: string;
  demo: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Hardware/IoT";
}

export const initialSkills: Skill[] = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Arduino", category: "Hardware/IoT" },
];

export const initialProjects: Project[] = [
  {
    id: "1",
    title: "NeuroCore AI",
    desc: "A high-performance neural network visualizer built with WebGL and Rust.",
    tags: ["Rust", "WebGL", "TypeScript"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];
