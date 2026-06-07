import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import Spinner from '../../ui/Spinner';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const queryClient = useQueryClient();
  const { errors } = formState;

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    mutationKey: ['createCabin'],
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries(['cabins']);
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(error) {
    console.log(error);
  }

  if (isCreating) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
          {...register('max_capacity', {
            valueAsNumber: true,
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isCreating}
          {...register('regular_price', {
            valueAsNumber: true,
            required: 'This field is required',
            min: {
              value: 50,
              message: 'Price should be at least 50',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required',
            valueAsNumber: true,
            validate: (value, formValues) => {
              // Need to convert to number for correct comparison
              return (
                value <= formValues.regular_price ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
