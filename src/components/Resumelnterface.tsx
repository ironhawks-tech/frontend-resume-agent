import UploadPanel from "./resume/UploadPanel";
import ResumePreview from "./resume/ResumePreview";
import ResumeDataDisplay from "./resume/ResumeDataDisplay";
import JobFilters from "./resume/JobFilters";
import JobMatches from "./resume/JobMatches";
import ProgressSteps from "./resume/ProgressSteps";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload,
  FileText,
  Briefcase,
  Shield,
  Users,
  Award,
  Clock,
  Target,
  Search,
} from "lucide-react";
import {
  uploadResumeApi,
  analyzeResumeApi,
  ResumeData,
} from "@/mocks/mockResumeApi";
import { fetchJobsApi, Job } from "@/mocks/mockJobsApi";

export default function ResumeInterface() {
  const [consent, setConsent] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const { toast } = useToast();

  const handleConsentChange = (checked: boolean | "indeterminate") => {
    setConsent(checked === true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setResumeData(null);

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await uploadResumeApi(file);
      clearInterval(interval);
      setUploadProgress(100);

      if (result.success) {
        toast({
          title: "Upload Successful",
          description: result.message,
        });

        setActiveTab("parser");
        // Auto-switch to parser tab after successful upload
        await handleAnalyzeResume();
      }
    } catch (error) {
      clearInterval(interval);
      toast({
        title: "Upload Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const data = await analyzeResumeApi();
      setResumeData(data);
      toast({
        title: "Analysis Complete",
        description: "Resume has been successfully analyzed",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSecureUpload = () => {
    const fileInput = document.getElementById("resume") as HTMLInputElement;
    fileInput?.click();
  };

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );

    toast({
      title: savedJobs.includes(jobId) ? "Job Removed" : "Job Saved",
      description: savedJobs.includes(jobId)
        ? "Removed from saved jobs"
        : "Added to saved jobs",
    });
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Good Match";
    if (score >= 70) return "Fair Match";
    return "Basic Match";
  };

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.trim().toLowerCase();
    const loc = locationFilter.trim().toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q);

    const matchesLocation = !loc || job.location.toLowerCase().includes(loc);

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header with Animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full animate-pulse delay-200"></div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-4">
            AI-Powered Resume Matcher
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your career journey with our intelligent matching system
            that connects your unique skills with perfect opportunities in under
            60 seconds
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-blue-700">
                Bank-level Security
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-green-700">
                50,000+ Happy Users
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-purple-700">
                AI Technology Leader
              </span>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Enhanced Tab Navigation */}
          <ProgressSteps activeTab={activeTab} />

          <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-white/80 backdrop-blur-sm border-2 border-blue-100 shadow-lg">
            <TabsTrigger
              value="landing"
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 relative overflow-hidden"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger
              value="parser"
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume Analysis
            </TabsTrigger>
            <TabsTrigger
              value="matching"
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Job Matching
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Enhanced Landing Page */}
          <UploadPanel
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleFileUpload={handleFileUpload}
            handleSecureUpload={handleSecureUpload}
          />

          {/* TAB 2: Enhanced Resume Parser */}
          <TabsContent value="parser" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Resume Preview */}
              <ResumePreview
                uploadedFile={uploadedFile}
                isAnalyzing={isAnalyzing}
              />

              {/* Enhanced Parsed Resume Details */}
              <ResumeDataDisplay
                resumeData={resumeData}
                consent={consent}
                onConsentChange={handleConsentChange}
                onFindJobs={async () => {
                  setJobsLoading(true);
                  const data = await fetchJobsApi();
                  setJobs(data);
                  setJobsLoading(false);
                  handleTabChange("matching");
                }}
                disabled={!consent || !resumeData}
              />
            </div>
          </TabsContent>

          {/* TAB 3: Job Matching */}
          <TabsContent value="matching" className="animate-fade-in">
            <div className="space-y-8">
              {/* Header with Search and Filters */}
              <Card className="border-blue-100 shadow-xl bg-gradient-to-r from-white to-blue-50/30">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        Job Matches for {resumeData?.name || "You"}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">
                        Found {filteredJobs.length} perfect matches based on
                        your skills and experience
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        <Target className="w-3 h-3 mr-1" />
                        AI Matched
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Real-time
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <JobFilters
                    searchQuery={searchQuery}
                    locationFilter={locationFilter}
                    setSearchQuery={setSearchQuery}
                    setLocationFilter={setLocationFilter}
                  />
                </CardContent>
              </Card>

              {/* Job Cards Grid */}
              <JobMatches
                jobs={filteredJobs}
                resumeData={resumeData}
                savedJobs={savedJobs}
                toggleSaveJob={toggleSaveJob}
                getMatchLabel={getMatchLabel}
                getMatchColor={getMatchColor}
                jobsLoading={jobsLoading}
              />

              {/* No Results State */}
              {filteredJobs.length === 0 && (
                <Card className="text-center py-16 border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
                  <CardContent>
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or location filter
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setLocationFilter("");
                      }}
                      variant="outline"
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
