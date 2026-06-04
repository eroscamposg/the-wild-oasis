import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // 2. Sort
  const sortByRaw = searchParams.get('sortBy') || 'start_date-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // 3. Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Getting the count with supabase count option adds delay, so need to initislize with an empty object
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return {
    bookings,
    isLoading,
    error,
    count,
  };
}
