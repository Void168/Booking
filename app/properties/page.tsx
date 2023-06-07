import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Bạn chưa có quyền" subtitle="Hãy đăng nhập" />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Không tìm thấy thông tin"
        subtitle="Có vẻ như bạn chưa có thông tin"
      />
    );
  }
    
    return <PropertiesClient listings={listings} currentUser={currentUser}/>;
};

export default PropertiesPage;
