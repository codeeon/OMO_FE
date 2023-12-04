import React from 'react';
import styled from 'styled-components';
import { LuMapPin } from 'react-icons/lu';

const PlaceCommnetCard = () => {
  return (
    <Base>
      <PlaceName>
        <LuMapPin />
        <span>서울시 광진구 아차산</span>
      </PlaceName>
      <Text>
        요즘에 다들 놀러간다길래 <br /> 남자친구랑 같이 놀러 가봤는데
        재밌었어요!!
      </Text>
    </Base>
  );
};

export default PlaceCommnetCard;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: calc(387px - 5px);
  height: 161px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  padding: 25px;
`;

const PlaceName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  svg {
    font-size: 24px;
    color: #5a5a5a;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    color: #5a5a5a;
  }
`;

const Text = styled.div`
  margin-top: 25px;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  color: #5a5a5a;
`;
