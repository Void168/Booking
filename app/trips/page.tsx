import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Bạn chưa có quyền" subtitle="Hãy đăng nhập" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Không tìm thấy chuyến đi"
        subtitle="Có vẻ như bạn chưa đặt lịch hẹn cho một chuyến đi này"
      />
    );
    }
    
    return <TripsClient reservations={reservations} currentUser={currentUser}/>;
};

export default TripsPage;
