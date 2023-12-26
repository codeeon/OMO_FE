import React, { SetStateAction } from 'react';
import Posts from '../components/posts';
import styled from 'styled-components';

interface Props {
  currentDistrict: string | undefined;
  setCurrentDistrict: React.Dispatch<SetStateAction<string | undefined>>;
  themeMode: string | null;
}

const Contents: React.FC<Props> = ({
  currentDistrict,
  setCurrentDistrict,
  themeMode,
}) => {
  return (
    <Base>
      <Posts
        themeMode={themeMode}
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
      />
    </Base>
  );
};

export default Contents;

const Base = styled.div``;
