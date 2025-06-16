import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ResumePreviewProps {
  uploadedFile: File | null;
  isAnalyzing: boolean;
}

const ResumePreview = ({ uploadedFile, isAnalyzing }: ResumePreviewProps) => {
  return (
    <Card className="h-fit border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          Resume Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="
                    h-[500px] 
                    border-2 border-dashed border-blue-200 
                    rounded-xl bg-gradient-to-br from-blue-50/20 to-blue-100/20 
                    flex flex-col items-stretch justify-start p-4 overflow-y-auto
                    hover:border-blue-300 transition-all duration-300"
        >
          {uploadedFile ? (
            <div className="text-center">
              {isAnalyzing ? (
                <div className="animate-pulse">
                  <FileText className="w-20 h-20 text-blue-400 mb-6 mx-auto animate-bounce" />
                  <p className="text-lg text-blue-600 font-medium">
                    Analyzing resume...
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Our AI is extracting key information
                  </p>
                </div>
              ) : (
                <div>
                  <FileText className="w-20 h-20 text-green-500 mb-6 mx-auto" />
                  <p className="text-lg text-green-600 font-medium mb-2">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Resume uploaded successfully
                  </p>
                  {uploadedFile.type === "application/pdf" ? (
                    <div className="w-full h-64 overflow-auto rounded-lg border border-blue-200 shadow-sm overflow-hidden">
                      <iframe
                        src={URL.createObjectURL(uploadedFile)}
                        title="Resume Preview"
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-blue-500 font-medium italic">
                      Preview not supported for this file type.
                      <br />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="animate-pulse text-center">
              <FileText className="w-20 h-20 text-blue-400 mb-6 mx-auto" />
              <p className="text-muted-foreground text-lg mb-2">
                Your resume will appear here once uploaded
              </p>
              <p className="text-sm text-blue-600 font-medium">
                PDF, DOC, or DOCX format supported
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
