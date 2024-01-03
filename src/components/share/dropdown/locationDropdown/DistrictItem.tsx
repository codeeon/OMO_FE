import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import useDistrictStore from '../../../../store/location/districtStore';

interface Props {
  dist: string;
}

const DistrictItem: React.FC<Props> = ({ dist }) => {
  const { setDistrict } = useDistrictStore();
  return (
    <Item variants={itemVariants} onClick={() => setDistrict(dist)}>
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

  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;

  padding-left: 5px;

  cursor: pointer;
  &:hover {
    background: #fcf0f3;
  }
`;

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
