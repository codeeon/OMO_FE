import React, { ReactNode, SetStateAction } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { itemVariants } from '../../../../styles/Motion';

interface Props {
  dist: string;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const DistrictItem: React.FC<Props> = ({ dist, setCurrentLocation }) => {
  return (
    <Item variants={itemVariants} onClick={() => setCurrentLocation(dist)}>
      {dist}
    </Item>
  );
};

export default DistrictItem;

const Item = styled(motion.li)`
  display: flex;
  justify-content: start;
  align-items: center;

  width: calc(28% - 0px);
  height: 30px;

  color: #000;
  font-size: 16px;
  font-weight: 700;

  padding-left: 5px;

  cursor: pointer;
  &:hover {
    background: #fcf0f3;
  }
  transition: background 300ms ease-in-out;
`;
