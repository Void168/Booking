import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListing";
import FavouritesClient from "./FavouritesClient";

const ListingPage = async () => {
  const listings = await getFavouriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Danh sách trống"
        subtitle="Có vẻ như bạn chưa có địa điểm yêu thích"
      />
    );
  }

  return <FavouritesClient listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
