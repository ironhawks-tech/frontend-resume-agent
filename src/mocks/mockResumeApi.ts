// /src/services/mockResumeApi.ts

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  role: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    job_title: string;
    company: string;
    years: number;
  }>;
}

export function uploadResumeApi(
  file: File
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `“${file.name}” uploaded (dummy).`,
      });
    }, 1200);
  });
}

export function analyzeResumeApi(): Promise<ResumeData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        email: "john@example.com",
        phone: "+91-9876543210",
        role: "Backend Developer",
        skills: ["Python", "Flask", "SQL"],
        education: [
          {
            degree: "B.Tech",
            institution: "ABC University",
            year: "2023",
          },
        ],
        experience: [
          {
            job_title: "Backend Developer",
            company: "XYZ",
            years: 2,
          },
        ],
      });
    }, 1800);
  });
}