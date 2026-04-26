import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: newCabin => createEditCabin(newCabin, null),
    mutationKey: ['createCabin'],
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries(['cabins']);
      //   reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return {
    createCabin,
    isCreating,
  };
}
