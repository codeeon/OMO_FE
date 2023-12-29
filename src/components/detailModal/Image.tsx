import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { AnimatePresence, wrap, motion } from 'framer-motion';
import LeftArrow from '../../assets/icons/LeftArrow';
import { RightArrow } from '../../assets/icons/RightArrow';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Image: React.FC<{ imgUrl: string[] }> = ({ imgUrl }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, imgUrl.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Base>
      <AnimatePresenceContainer initial={false} custom={direction}>
        <MotionImg
          key={page}
          src={imgUrl[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresenceContainer>
      {imgUrl.length > 1 && (
        <>
          <PageBtn
            $position="next"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <RightArrow color="border" width="20px" height="20px" />
          </PageBtn>
          <PageBtn
            $position="prev"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <LeftArrow color="border" width="20px" height="20px" />
          </PageBtn>
        </>
      )}

      <Navigation>
        {((page + imgUrl.length) % imgUrl.length) + 1} / {imgUrl.length}
      </Navigation>
    </Base>
  );
};

export default Image;

const PageBtn = styled(motion.div)<{ $position: string }>`
  opacity: 0;
  top: calc(50% - 20px);

  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
  ${({ $position }) =>
    $position === 'prev'
      ? css`
          left: 10px;
        `
      : css`
          right: 10px;
        `}
  transition : opacity 300ms ease;
`;

const Navigation = styled.div`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 20px;
  padding: 5px 10px;
  left: 50%;
  transform: translatex(-50%);
  z-index: 99;
  transition: opacity 300ms ease;
`;

const Base = styled(motion.div)`
  margin-top: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  &:hover ${PageBtn} {
    opacity: 1;
  }
  &:hover ${Navigation} {
    opacity: 1;
  }
`;

const AnimatePresenceContainer = styled(AnimatePresence)``;

const MotionImg = styled(motion.img)`
  position: relative;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
`;
