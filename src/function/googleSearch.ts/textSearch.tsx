import { Dispatch, SetStateAction } from 'react';

export const textSearchFields = [
  'business_status',
  'formatted_address',
  'geometry',
  'name',
  'photos',
  'types',
  'place_id',
  'current_opening_hours',
  'business_status',
  'address_components',
  'delivery',
  'editorial_summary',
  'formatted_address',
  'formatted_phone_number',
];

// placeServiceCallbacks.ts
export const placeInfoCallback = (
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
