import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    mutationKey: ['updateCurrentUser'],
    onSuccess: () => {
      toast.success('User account successfully updated');
      queryClient.invalidateQueries(['user']);
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return {
    updateCurrentUser,
    isUpdating,
  };
}
