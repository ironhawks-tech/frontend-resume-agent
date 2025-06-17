import { USE_MOCK_API } from "@/config/apiMode";

import * as MockResume from "@/mocks/mockResumeApi";
import * as RealResume from "@/api/resumeApi";

import * as MockJobs from "@/mocks/mockJobsApi";
import * as RealJobs from "@/api/jobsApi";


export const uploadResumeApi = USE_MOCK_API
    ? MockResume.uploadResumeApi
    : RealResume.uploadResumeApi;

export const analyzeResumeApi = USE_MOCK_API
    ? MockResume.analyzeResumeApi
    : RealResume.analyzeResumeApi;

export const fetchJobsApi = USE_MOCK_API
    ? MockJobs.fetchJobsApi
    : RealJobs.fetchJobsApi;