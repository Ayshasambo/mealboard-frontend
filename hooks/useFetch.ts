import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

export const useFetch = <T>(endpoint: string,) => {
  return useQuery<T>({
    queryKey:['mealData', endpoint],
    queryFn: async () => {
      const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
      return response.data;
    },
  });
};
