import { Progress } from "@/components/ui/progress";

interface ProgressStepsProps {
  activeTab: string;
}

const ProgressSteps = ({ activeTab }: ProgressStepsProps) => {
  const progressValue =
    activeTab === "landing" ? 33 : activeTab === "parser" ? 66 : 100;

  return (
    <div className="mt-8 mb-4 max-w-md mx-auto">
      <div className="flex items-center justify-between text-xs text-blue-600 mb-2">
        <span className={activeTab === "landing" ? "font-semibold" : ""}>
          Upload
        </span>
        <span className={activeTab === "parser" ? "font-semibold" : ""}>
          Analyze
        </span>
        <span className={activeTab === "matching" ? "font-semibold" : ""}>
          Match
        </span>
      </div>
      <Progress
        value={activeTab === "landing" ? 33 : activeTab === "parser" ? 66 : 100}
        className="h-2 bg-blue-100"
      />
    </div>
  );
};
export default ProgressSteps;
