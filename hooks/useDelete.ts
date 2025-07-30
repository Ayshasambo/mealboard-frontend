import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

export const useDelete = <T>(endpoint: string, queryKey: string | string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await axios.delete<T>(`${BASE_URL}${endpoint}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey});
    },
  });
};
