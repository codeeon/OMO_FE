import React, { SetStateAction } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';
import DistrictItem from './DistrictItem';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { itemVariants } from '../../../../styles/Motion';

interface MenuProps {
  isOpen: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<string | undefined, unknown>>;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
  isLoading: boolean;
}

const Menu: React.FC<MenuProps> = ({
  isOpen,
  refetch,
  setCurrentLocation,
  isLoading,
}) => {
  return (
    <Base
      variants={{
        open: {
          clipPath: 'inset(0% 0% 0% 0% round 10px)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3,
          },
        },
      }}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <MenuHeader refetch={refetch} isLoading={isLoading} />
      <BodyContainer variants={itemVariants}>
        <CityDivider>서울</CityDivider>
        <DistrictList>
          {SeoulDistrict.map((dist) => (
            <DistrictItem
              key={dist}
              setCurrentLocation={setCurrentLocation}
              dist={dist}
            />
          ))}
        </DistrictList>
      </BodyContainer>
    </Base>
  );
};

export default Menu;

const Base = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  background: #fff;
  width: 500px;
  height: 200px;
  position: absolute;
  top: 50px;
  left: -170px;
  z-index: 99;
`;

const BodyContainer = styled(motion.div)`
  display: flex;
  justify-content: start;
  align-items: start;
  overflow-y: scroll;
`;

const CityDivider = styled(motion.div)`
  color: #f97393;
  font-size: 16px;
  font-weight: 700;
  height: 100%;
  width: 300px;
  padding: 25px;
`;

const DistrictList = styled(motion.ul)`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  height: 400px;

  padding: 20px;
  border-left: 1px solid #d9d9d9;
`;

const SeoulDistrict = [
  '전체',
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];
