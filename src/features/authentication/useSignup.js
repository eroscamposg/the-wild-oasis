import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signupApi,
    onSuccess: user => {
      console.log(user);
      toast.success(
        "User successfully created! Please verify the new account from the user's email adress"
      );
    },
  });

  return {
    signup,
    isLoading,
  };
}
