import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    mutationKey: ['editCabin'],
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries(['cabins']);
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return {
    editCabin,
    isEditing,
  };
}
