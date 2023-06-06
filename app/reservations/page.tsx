import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Không có bài đăng"
        subtitle="Có vẻ như bạn không có bài đăng nào ở trang của bạn"
      />
    );
    }
    
    return (
        <ReservationsClient reservations={reservations} currentUser={currentUser}/>
    )
};

export default ReservationsPage;
