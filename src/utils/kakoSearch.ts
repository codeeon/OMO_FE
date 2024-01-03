import _ from 'lodash';
import { SetStateAction } from 'react';

export const kakaoPlaceSearch = _.debounce(
  (
    query: string,
    setSearchValue: React.Dispatch<
      SetStateAction<kakao.maps.services.PlacesSearchResult>
    >,
  ) => {
    const ps = new kakao.maps.services.Places();

    return ps.keywordSearch(query, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchValue(data);
        return data;
      }
    });
  },
  500,
);
