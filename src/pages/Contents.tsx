import React, { SetStateAction } from 'react';
import Posts from '../components/posts';
import styled from 'styled-components';

interface Props {
  currentDistrict: string | undefined;
  setCurrentDistrict: React.Dispatch<SetStateAction<string | undefined>>;
  themeMode: string | null;
  map: google.maps.Map | null;
}

const Contents: React.FC<Props> = ({
  currentDistrict,
  setCurrentDistrict,
  themeMode,
  map,
}) => {
  return (
    <Base>
      <Posts
        themeMode={themeMode}
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
        map={map}
      />
    </Base>
  );
};

export default Contents;

const Base = styled.div``;
