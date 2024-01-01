import { Dispatch, SetStateAction } from 'react';

export const detailSearchFields = [
  'address_components',
  'business_status',
  'formatted_phone_number',
  'name',
  'opening_hours',
  'rating',
  'geometry',
  'photos',
  'reviews',
];

// placeServiceCallbacks.ts
export const placeDetailCallback = (
  results: google.maps.places.PlaceResult[] | null,
  status: google.maps.places.PlacesServiceStatus,
  setSearchResult: Dispatch<
    SetStateAction<google.maps.places.PlaceResult[] | string>
  >,
) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    setSearchResult(results ? results : 'null');
  } else if (
    status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST ||
    status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
  ) {
    setSearchResult('null');
  } else {
    //
  }
};

export const placeSearchCallback = (
  results: google.maps.places.PlaceResult[] | null,
  status: google.maps.places.PlacesServiceStatus,
  setSearchResult: Dispatch<
    SetStateAction<google.maps.places.PlaceResult[] | null>
  >,
) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    setSearchResult(results);
  } else if (
    status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST ||
    status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
  ) {
    //
  } else {
    //
  }
};
