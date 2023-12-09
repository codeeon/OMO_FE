import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './hotContentsSkeleton.css';

const HotContentsCardSkeleton: React.FC = () => {
  return (
    <Base>
      <HotContentsBox>
        <Skeleton className="img"></Skeleton>
        <Skeleton className="title"></Skeleton>
        <HotContentsBody>
          <Skeleton className="body"></Skeleton>
          <HotContentsNavigation>
            <Skeleton className="category"></Skeleton>
            <HotContentsMap>
              <Skeleton className="link"></Skeleton>
            </HotContentsMap>
          </HotContentsNavigation>
        </HotContentsBody>
      </HotContentsBox>
    </Base>
  );
};

export default HotContentsCardSkeleton;

const Base = styled.div`
  box-sizing: border-box;
`;

const HotContentsBox = styled.div`
  box-sizing: border-box;
  width: 385px;
  height: 327px;
  padding: 20px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
`;

const HotContentsBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 90px;
`;

const HotContentsNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const HotContentsMap = styled.div`
  display: flex;
  align-items: center;
`;
