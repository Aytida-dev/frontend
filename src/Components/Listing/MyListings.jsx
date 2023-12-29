import React, { useCallback, useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import useStatus from "../../hooks/useStatus";
import { toast } from "react-toastify";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { Button } from "flowbite-react";
import ListingSchema from "./ListingSchema";
import Listing from "./Listing";

const LISTING_PAGE_SIZE = import.meta.env.VITE_REACT_APP_LISTING_PAGE_SIZE;

const MyListings = () => {
  const { user } = useFirebase();
  const { isLoading, setLoading, setIdle } = useStatus();
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [listingsState, setListingsState] = useState(() => ({
    data: [],
    hasNext: false,
  }));

  const { getByEmail } = ListingSchema;

  const fetchNext = useCallback(async () => {
    try {
      setLoading();
      const lastRecord =
        listingsState.data.length > 0
          ? listingsState.data[listingsState.data.length - 1]
          : null;

      const newListings = await getByEmail(
        user.email,
        LISTING_PAGE_SIZE,
        lastRecord
      );

      setListingsState((prev) => ({
        data: isFirstFetch
          ? newListings.listings
          : [...prev.data, ...newListings.listings],
        hasNext: newListings.hasNext,
      }));
    } catch (error) {
      console.log(error.message);
      toast("Unable to fetch listings");
    } finally {
      setIdle();
    }
  }, [
    setLoading,
    setIdle,
    getByEmail,
    user.email,
    listingsState.data,
    isFirstFetch,
  ]);

  const loadMore = useCallback(() => fetchNext(), [fetchNext]);

  useEffect(() => {
    if (!isFirstFetch) return;
    setLoading();
    fetchNext(isFirstFetch).finally(() => {
      setIsFirstFetch(false);
      setIdle();
    });
  }, [setLoading, setIsFirstFetch, setIdle, fetchNext, isFirstFetch]);

  if (isLoading && isFirstFetch) return <AbsoluteSpinner />;

  return (
    <div>
      {listingsState.data.map((listing, i) => (
        <Listing post={listing} key={i} />
      ))}
      {isLoading && (
        <div className="h-10 relative">
          <AbsoluteSpinner />
        </div>
      )}
      {listingsState.hasNext && !isLoading && (
        <Button color="success" onClick={loadMore} className="my-3 mx-auto">
          Load More
        </Button>
      )}
    </div>
  );
};

export default MyListings;
