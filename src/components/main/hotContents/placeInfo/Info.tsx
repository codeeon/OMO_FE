import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  googleSearchResult: google.maps.places.PlaceResult | null;
}

const Info: React.FC<Props> = ({ googleSearchResult }) => {
  return <Base>{googleSearchResult?.name}</Base>;
};

export default Info;

const Base = styled.div``;
