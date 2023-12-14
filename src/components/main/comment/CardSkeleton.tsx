import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

const PlaceCommnetCard = () => {
  return (
    <Base>
      <QuoteContainer>
        <FaQuoteLeft />
      </QuoteContainer>
      <Text count={2} width="300px" height="20px" />
      <PlaceName width="150px" height="15px" />
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
  border-radius: 16px;

  padding: 24px 30px;
`;

const QuoteContainer = styled.div`
  font-size: 25px;
  color: #d9d9d9;
`;

const PlaceName = styled(Skeleton)`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Text = styled(Skeleton)`
  margin-top: 8px;

  width: 100%;
  height: 40px;
`;
