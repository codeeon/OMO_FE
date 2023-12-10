import React from 'react';
import styled from 'styled-components';
import { LuMapPin } from 'react-icons/lu';
import { FaQuoteLeft } from 'react-icons/fa';

const PlaceCommnetCard = () => {
  return (
    <Base>
      <QuoteContainer>
        <FaQuoteLeft />
      </QuoteContainer>
      <Text>
        요즘에 다들 놀러간다길래 <br /> 남자친구랑 같이 놀러 가봤는데
        재밌었어요!!
      </Text>
      <PlaceName>
        <LuMapPin />
        <span>서울시 광진구 아차산</span>
      </PlaceName>
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

const QuoteContainer = styled.div`
  font-size: 25px;
  color: #d9d9d9;
`;

const PlaceName = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  svg {
    font-size: 20px;
    color: #f97393;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    color: #5a5a5a;
  }
`;

const Text = styled.div`
  margin-top: 12px;
  color: #111;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
`;
