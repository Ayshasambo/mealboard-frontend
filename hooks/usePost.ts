import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

export const usePost = <T, D>(endpoint: string, queryKey: readonly unknown[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: D) => {
      const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // ✅ Correct and fully typed
    },
  });
};


// import { useQuery } from '@tanstack/react-query';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { BASE_URL } from '@/constants/api';

// const postDynamicData = async <T, D>(endpoint: string, data: D): Promise<T> => {
//     const response = await axios.post<T>(
//       `${BASE_URL}${endpoint}`,
//       data,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );
//     return response.data;
//   };
  
//   export const usePost = <T, D>(endpoint: string, queryKey: string | string[]) => {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: async (data: D) => {
//         const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data);
//         return response.data;
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey }); // ✅ Correct structure for v5
//       },
//     });
//   };
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { BASE_URL } from '@/constants/api';

// // Generic function to handle POST requests
// const postDynamicData = async <T, D>(endpoint: string, data: D): Promise<T> => {
//   const response = await axios.post<T>(
//     `${BASE_URL}${endpoint}`,
//     data,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   return response.data;
// };

// // Custom hook for posting data and optionally refetching queries
// export const usePost = <T, D>(endpoint: string, invalidateKey?: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: D) => postDynamicData<T, D>(endpoint, data),
//     onSuccess: () => {
//       if (invalidateKey) {
//         queryClient.invalidateQueries({ queryKey: [invalidateKey] });
//       }
//     },
//   });
// };
