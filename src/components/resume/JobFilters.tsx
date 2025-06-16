import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Search } from "lucide-react";

interface JobFiltersProps {
  searchQuery: string;
  locationFilter: string;
  setSearchQuery: (value: string) => void;
  setLocationFilter: (value: string) => void;
}

const JobFilters = ({
  searchQuery,
  locationFilter,
  setSearchQuery,
  setLocationFilter,
}: JobFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search jobs or companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 border-blue-200 focus:border-blue-500"
        />
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="pl-10 h-12 border-blue-200 focus:border-blue-500 lg:w-64"
        />
      </div>
      <Button
        variant="outline"
        className="h-12 px-6 border-blue-200 hover:bg-blue-50"
      >
        <Filter className="w-4 h-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
};

export default JobFilters;
