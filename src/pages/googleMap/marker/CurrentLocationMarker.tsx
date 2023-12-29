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
      >
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
      </OutLineCircle>
    </Base>
  );
};

export default CurrentLocationMarker;

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
`;

const OutLineCircle = styled(motion.div)`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #8dc8ff;
  opacity: 0.7;
  position: relative;
`;

const InnerCircle = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: #fff;
`;

const CenterCircle = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background: #0084ff;
`;
