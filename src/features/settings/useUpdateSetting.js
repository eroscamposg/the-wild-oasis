import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    mutationKey: ['updateSetting'],
    onSuccess: () => {
      toast.success('Setting successfully updated');
      queryClient.invalidateQueries(['settings']);
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return {
    updateSetting,
    isUpdating,
  };
}
