import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Upload,
  FileText,
  Star,
  Zap,
  Target,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Clock,
} from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

interface UploadPanelProps {
  isUploading: boolean;
  uploadProgress: number;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecureUpload: () => void;
}

const UploadPanel = ({
  isUploading,
  uploadProgress,
  handleFileUpload,
  handleSecureUpload,
}: UploadPanelProps) => {
  return (
    <TabsContent value="landing" className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Card */}
        <Card className="lg:col-span-2 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Upload Your Resume
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Support for PDF, DOC, and DOCX files up to 10MB
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="resume"
                className="text-sm font-medium flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Choose your resume file
              </Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="cursor-pointer border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-300 transition-all duration-300 h-12"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-blue-600 text-center">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
            <Button
              className="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleSecureUpload}
              disabled={isUploading}
            >
              <Upload className="w-5 h-5 mr-3" />
              {isUploading ? "Uploading..." : "Upload Resume Securely"}
            </Button>

            <div className="flex items-center gap-3 text-sm text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <span>
                Your data is encrypted end-to-end and never shared without your
                explicit consent
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Features Card */}
        <Card className="border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              Why Choose Us?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Lightning-Fast AI
                </h4>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms extract and analyze your skills in seconds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-1">
                  Perfect Job Matching
                </h4>
                <p className="text-sm text-muted-foreground">
                  Find opportunities that perfectly align with your unique
                  profile
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">
                  Privacy Guaranteed
                </h4>
                <p className="text-sm text-muted-foreground">
                  Bank-level encryption keeps your data completely secure
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-xs text-blue-700">Match Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">60s</div>
                  <div className="text-xs text-green-700">Average Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Proof Section */}
      <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Trusted by Professionals Worldwide
          </h3>
          <p className="text-muted-foreground">
            Join thousands who've found their dream jobs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-600">50K+</div>
            <div className="text-sm text-muted-foreground">
              Resumes Analyzed
            </div>
          </div>
          <div className="text-center p-4 hover:bg-green-50 rounded-lg transition-all duration-300">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-600">15K+</div>
            <div className="text-sm text-muted-foreground">Jobs Matched</div>
          </div>
          <div className="text-center p-4 hover:bg-purple-50 rounded-lg transition-all duration-300">
            <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-muted-foreground">
              Support Available
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default UploadPanel;
