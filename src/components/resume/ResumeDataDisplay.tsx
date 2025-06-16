import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  Users,
  Zap,
  Award,
  Briefcase,
  Target,
  FileText,
  Shield,
} from "lucide-react";
import { ResumeData } from "@/services/mockResumeApi";

interface ResumeDataDisplayProps {
  resumeData: ResumeData | null;
  consent: boolean;
  onConsentChange: (checked: boolean | "indeterminate") => void;
  onFindJobs: () => void;
  disabled: boolean;
}

const ResumeDataDisplay = ({
  resumeData,
  consent,
  onConsentChange,
  onFindJobs,
  disabled,
}: ResumeDataDisplayProps) => {
  return (
    <Card className="h-fit border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          Extracted Information
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-analyzed data from your resume with 98% accuracy
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {resumeData ? (
          <>
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-blue-700 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Personal Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all duration-300">
                  <span className="font-medium text-blue-900">Name</span>
                  <span className="text-muted-foreground">
                    {resumeData.name}
                  </span>
                </div>
                <div className="flex justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all duration-300">
                  <span className="font-medium text-blue-900">Email</span>
                  <span className="text-muted-foreground">
                    {resumeData.email}
                  </span>
                </div>
                <div className="flex justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all duration-300">
                  <span className="font-medium text-blue-900">Phone</span>
                  <span className="text-muted-foreground">
                    {resumeData.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-blue-700 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 hover:scale-105 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-blue-700 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Education
              </h4>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-blue-900">
                          {edu.degree}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-blue-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Experience
              </h4>
              <div className="space-y-3">
                {resumeData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-blue-900">
                          {exp.job_title}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">
                        {exp.years} years
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-blue-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Current Role
              </h4>
              <div className="flex justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-medium text-blue-900">Role</span>
                <span className="text-muted-foreground font-semibold">
                  {resumeData.role}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Upload a resume to see extracted information
            </p>
          </div>
        )}

        {/* Enhanced Consent */}
        <div className="pt-6 border-t border-blue-200">
          <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-150 transition-all duration-300">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={onConsentChange}
              className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-5 h-5"
            />
            <div className="space-y-2">
              <label
                htmlFor="consent"
                className="text-sm font-medium cursor-pointer text-blue-900 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />I consent to secure data
                processing for job matching
              </label>
              <p className="text-xs text-blue-700">
                We'll use your information to find relevant job opportunities
                with complete privacy protection. You can withdraw consent at
                any time.
              </p>
            </div>
          </div>
        </div>

        <Button
          disabled={disabled}
          className="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
          onClick={onFindJobs}
        >
          <Briefcase className="w-5 h-5 mr-3" />
          Find Perfect Job Matches
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeDataDisplay;
