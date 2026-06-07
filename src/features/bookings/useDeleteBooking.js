import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isLoading } = useMutation({
    mutationKey: ['deleteBooking'],
    mutationFn: bookingId => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success('Booking successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return {
    deleteBooking,
    isLoading,
  };
}
