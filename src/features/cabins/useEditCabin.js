import { QueryClient, useMutation } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useEditCabin() {
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    mutationKey: ['editCabin'],
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      QueryClient.invalidateQueries(['cabins']);
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
