import React from 'react';
import styled from 'styled-components';
import { LuMapPin } from 'react-icons/lu';
import { FaQuoteLeft } from 'react-icons/fa';
import { CommentPostsType, CommentType } from '../../../model/interface';

const PlaceCommnetCard: React.FC<{ comment: CommentPostsType }> = ({
  comment,
}) => {
  const { content } = comment;
  return (
    <Base>
      <QuoteContainer>
        <FaQuoteLeft />
      </QuoteContainer>
      <Text>{content}</Text>
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
  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 16px;

  padding: 24px 30px;
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
    color: ${({ theme }) => theme.color.sub};
  }
`;

const Text = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  width: 100%;
  height: 40px;
  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;
