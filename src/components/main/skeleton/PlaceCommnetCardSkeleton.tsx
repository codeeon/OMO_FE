import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './placeCommnetCardSkeleton.css';

const PlaceCommnetCardSkeleton = () => {
  return (
    <Base>
      {quote}
      <Skeleton className="text" />
      <PlaceName>
        <Skeleton className="address" />
      </PlaceName>
    </Base>
  );
};

export default PlaceCommnetCardSkeleton;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;

  width: calc(387px - 5px);
  height: 161px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  padding: 24px 30px;
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
`;

const quote = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path
      d="M24 22H14.2037V13.3209C14.2037 11.9256 14.4309 10.7256 14.8852 9.72093C15.3395 8.69767 15.9453 7.82326 16.7025 7.09767C17.4786 6.35349 18.3778 5.73953 19.4 5.25581C20.4222 4.75349 21.5012 4.33488 22.637 4L23.9716 6.95814C23.1387 7.25581 22.4383 7.56279 21.8704 7.87907C21.3214 8.17674 20.8671 8.52093 20.5074 8.91163C20.1667 9.28372 19.9206 9.72093 19.7691 10.2233C19.6177 10.707 19.542 11.2837 19.542 11.9535H24V22ZM10.8247 22H1V13.3209C1 11.9256 1.22716 10.7256 1.68148 9.72093C2.1358 8.69767 2.74156 7.82326 3.49877 7.09767C4.2749 6.35349 5.17407 5.73953 6.1963 5.25581C7.23745 4.75349 8.32593 4.33488 9.46173 4L10.7963 6.95814C9.96337 7.25581 9.26296 7.56279 8.69506 7.87907C8.14609 8.17674 7.69177 8.52093 7.3321 8.91163C6.99136 9.28372 6.74527 9.72093 6.59383 10.2233C6.44239 10.707 6.36667 11.2837 6.36667 11.9535H10.8247V22Z"
      fill="#D9D9D9"
    />
  </svg>
);
