import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Building,
  ExternalLink,
  Heart,
} from "lucide-react";
import { Job } from "@/mocks/mockJobsApi";
import { ResumeData } from "@/mocks/mockResumeApi";

interface JobMatchesProps {
  jobs: Job[];
  savedJobs: number[];
  resumeData: ResumeData | null;
  toggleSaveJob: (id: number) => void;
  getMatchLabel: (score: number) => string;
  getMatchColor: (score: number) => string;
  jobsLoading: boolean;
}

const JobMatches = ({
  jobs,
  savedJobs,
  resumeData,
  toggleSaveJob,
  getMatchLabel,
  getMatchColor,
  jobsLoading,
}: JobMatchesProps) => {
  if (jobsLoading) return <div>Loading Jobs…</div>;

  if (jobs.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/20"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-2xl">
                  {job.logo}
                </div>
                <div>
                  <CardTitle className="text-lg text-blue-900 hover:text-blue-700 transition-colors">
                    {job.title}
                  </CardTitle>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Building className="w-3 h-3" />
                    {job.company}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSaveJob(job.id)}
                className={`${
                  savedJobs.includes(job.id)
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-red-500"
                } transition-colors`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    savedJobs.includes(job.id) ? "fill-current" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Match Score */}
            <div className="flex items-center justify-between mt-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 relative">
                    <svg
                      className="w-12 h-12 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${job.matchScore}, 100`}
                        className={getMatchColor(job.matchScore).replace(
                          "bg-",
                          "text-"
                        )}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">
                        {job.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-blue-900">
                    {getMatchLabel(job.matchScore)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Based on your skills
                  </p>
                </div>
              </div>
              <Badge
                className={`${getMatchColor(
                  job.matchScore
                )} text-white border-none`}
              >
                {job.matchScore}% Match
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-muted-foreground">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span className="text-muted-foreground">{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-muted-foreground">{job.posted}</span>
              </div>
            </div>

            {/* Job Description */}
            <p className="text-sm text-gray-700 line-clamp-3">
              {job.description}
            </p>

            {/* Skills Match */}
            <div>
              <h5 className="font-semibold text-sm text-blue-900 mb-2">
                Required Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`text-xs ${
                      resumeData?.skills.some(
                        (userSkill) =>
                          userSkill
                            .toLowerCase()
                            .includes(skill.toLowerCase()) ||
                          skill.toLowerCase().includes(userSkill.toLowerCase())
                      )
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
                {job.requirements.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.requirements.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h5 className="font-semibold text-sm text-blue-900 mb-2">
                Benefits
              </h5>
              <div className="flex flex-wrap gap-2">
                {job.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {benefit}
                  </Badge>
                ))}
                {job.benefits.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.benefits.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4 border-t border-blue-100">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
              <Button
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobMatches;
