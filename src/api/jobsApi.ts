import axios from 'axios';

export const fetchJobsApi = async () => {
    const res = await axios.get('/api/jobs');
    return res.data;
};