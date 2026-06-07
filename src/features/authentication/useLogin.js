import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: data => {
      // This is to avoid an extra getCurrentUser api call when redirecting to a ProtectedRoute page
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard', { replace: true });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return {
    login,
    isLoading,
  };
}
