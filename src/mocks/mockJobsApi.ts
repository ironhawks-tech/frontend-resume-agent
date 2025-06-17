// /src/services/mockJobsApi.ts

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  matchScore: number;
  description: string;
  requirements: string[];
  benefits: string[];
  logo: string;
}

// Mock job data
const jobsData = [
  {
    id: 1,
    title: "Senior Backend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "2 days ago",
    matchScore: 95,
    description:
      "We're looking for a Senior Backend Developer to join our growing team. You'll work with Python, Flask, and SQL to build scalable applications.",
    requirements: [
      "Python",
      "Flask",
      "SQL",
      "5+ years experience",
      "REST APIs",
    ],
    benefits: ["Health Insurance", "401k", "Remote Work", "Unlimited PTO"],
    logo: "🏢",
  },
  {
    id: 2,
    title: "Full Stack Python Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "1 week ago",
    matchScore: 88,
    description:
      "Join our dynamic startup as a Full Stack Python Developer. Work with modern tech stack and contribute to innovative products.",
    requirements: ["Python", "React", "SQL", "3+ years experience", "Git"],
    benefits: [
      "Equity",
      "Health Insurance",
      "Flexible Hours",
      "Learning Budget",
    ],
    logo: "🚀",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataFlow Solutions",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "3 days ago",
    matchScore: 82,
    description:
      "We need a Backend Engineer to help us process millions of data points daily. Experience with Python and databases required.",
    requirements: [
      "Python",
      "PostgreSQL",
      "Docker",
      "AWS",
      "2+ years experience",
    ],
    benefits: [
      "Remote First",
      "Health Insurance",
      "Stock Options",
      "Conference Budget",
    ],
    logo: "📊",
  },
  {
    id: 4,
    title: "Python Developer",
    company: "CloudTech",
    location: "Seattle, WA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "5 days ago",
    matchScore: 75,
    description:
      "Looking for a Python Developer to work on cloud infrastructure and automation tools.",
    requirements: [
      "Python",
      "Linux",
      "Automation",
      "Cloud platforms",
      "1+ years experience",
    ],
    benefits: ["Health Insurance", "401k", "Paid Time Off", "Tech Stipend"],
    logo: "☁️",
  }, ];

export function fetchJobsApi(): Promise<Job[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobsData), 1000);
  });
}