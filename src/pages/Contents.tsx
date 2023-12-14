import React, { SetStateAction } from 'react';
import Posts from '../components/posts';
import styled from 'styled-components';

interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const Contents: React.FC<Props> = ({ currentLocation, setCurrentLocation }) => {
  return (
    <Base>
      <Posts
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
    </Base>
  );
};

export default Contents;

const Base = styled.div`
`;
