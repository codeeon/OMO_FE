import React from 'react';
import styled from 'styled-components';
import { BiSolidMap } from 'react-icons/bi';

interface Props {
  placeName: string;
  locationName: string;
  content: string;
}

const DetalModalBody: React.FC<Props> = ({
  placeName,
  locationName,
  content,
}) => {
  return (
    <Base>
      <Title>{placeName}</Title>
      <PlaceInfo>
        <BiSolidMap />
        <span>{locationName}</span>
      </PlaceInfo>
      <Text>{content}</Text>
    </Base>
  );
};

export default DetalModalBody;

const Base = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const PlaceInfo = styled.div`
  margin-top: 13px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
`;

const Text = styled.div`
  margin-top: 33px;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%;
  letter-spacing: -0.16px;
  width: 515px;
`;
