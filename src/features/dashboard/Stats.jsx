import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce(
    (acc, cur) => acc + (cur.total_price + cur.extras_price),
    0
  );

  const checkins = confirmedStays.length;

  const occupations = confirmedStays.reduce(
    (acc, cur) => acc + cur.num_nights,
    0
  );

  const occupationRate = occupations / (numDays * cabinCount);
  // Number of checked in nights / all available nights (num days + num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineBriefcase />}
        value={Math.round(occupationRate * 100) + '%'}
      />
    </>
  );
}

export default Stats;
