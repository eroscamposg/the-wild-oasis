import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    //   Data is the data returned from the mutationFn
    onSuccess: data => {
      toast.success(`Booking #${data.id} succesfully checked out`);
      queryClient.invalidateQueries({ type: 'active' });
      navigate('/');
    },
    onError: () => toast.error('There was en error while check in'),
  });

  return {
    checkout,
    isCheckingOut,
  };
}
