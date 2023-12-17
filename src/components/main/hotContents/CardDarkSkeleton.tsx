import React from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardDarkSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#29282E" highlightColor="#1B1B20">
      <Base>
        <Wrapper>
          <Skeleton
            width="343px"
            height="155px"
            borderRadius="8px"
            className="img"
          />
          <Skeleton
            width="70px"
            height="20px"
            borderRadius="8px"
            style={{ margin: '12px 0 10px 0' }}
          ></Skeleton>
          <BodyContainer>
            <Skeleton width="341px" height="44px" border-radius="8px" />
            <MapBtnConatiner>
              <Skeleton width="34px" height="14px" />
              <HotContentsMap>
                <Skeleton width="82px" height="14px" />
              </HotContentsMap>
            </MapBtnConatiner>
          </BodyContainer>
        </Wrapper>
      </Base>
    </SkeletonTheme>
  );
};

export default CardDarkSkeleton;

const Base = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  border-radius: 8px;
`;

const Wrapper = styled.div`
  width: 343px;
  height: 280px;
  padding: 20px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 90px;
`;

const MapBtnConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const HotContentsMap = styled.div`
  display: flex;
  align-items: center;
`;
