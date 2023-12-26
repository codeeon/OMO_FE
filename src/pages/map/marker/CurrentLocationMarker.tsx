import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const CurrentLocationMarker = () => {
  return (
    <Base>
      <OutLineCircle
        animate={{
          scale: [1, 1.3, 1],
          borderRadius: ['100%', '100%', '100%', '100%', '100%'],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      <InnerCircle>
        <CenterCircle
          animate={{
            scale: [1, 0.7, 1],
            borderRadius: ['100%', '100%', '100%', '100%', '100%'],
          }}
          transition={{
            duration: 5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      </InnerCircle>
    </Base>
  );
};

export default CurrentLocationMarker;

const Base = styled.div`
  position: relative;
`;

const OutLineCircle = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  background: #44a5ff;
  opacity: 0.7;
`;

const InnerCircle = styled(motion.div)`
  position: absolute;
  top: 7px;
  left: 7px;

  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: #fff;
`;

const CenterCircle = styled(motion.div)`
  position: absolute;
  top: 2.36px;
  left: 2.36px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background: #44a5ff;
`;
