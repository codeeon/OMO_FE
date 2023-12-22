import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBookmark } from 'react-icons/fi';
import usePostBookmarkMutation from '../../../../hooks/reactQuery/bookmark/usePostBookmarkMutation';
import { BookmarkLocationType } from '../../../../model/interface';
import useDeleteBookmarkMutation from '../../../../hooks/reactQuery/bookmark/useDeleteBookmarkMutation';
import useGetBookmarkQuery from '../../../../hooks/reactQuery/bookmark/useGetBookmarkQuery';
interface Props {
  locationId: number | undefined;
  bookmarkPlaceDb: BookmarkLocationType[];
}

const BookmarkBtn: React.FC<Props> = ({ locationId, bookmarkPlaceDb }) => {
  const { data, isLoading, refetch } = useGetBookmarkQuery();

  const isBookmarking =
    !isLoading &&
    data?.some(
      (db: BookmarkLocationType) => db.Location.locationId === locationId,
    );

  const { postBookmarkingMutate, isPostBookmarkingLoading } =
    usePostBookmarkMutation(locationId);
  const { deletebookmarkingMutate, isDeleteBookmarkingLoading } =
    useDeleteBookmarkMutation(locationId);

  const toggleBookmarkHandler = () => {
    isBookmarking
      ? deletebookmarkingMutate({ locationId })
      : postBookmarkingMutate({ locationId });
  };

  return (
    <Base onClick={toggleBookmarkHandler}>
      <Wrapper
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        isBookmarking={isBookmarking}
      >
        <FiBookmark />
        <span>{isBookmarking ? '북마크 취소' : '북마크'}</span>
      </Wrapper>
    </Base>
  );
};

export default BookmarkBtn;

const Base = styled.div`
  margin: 15px auto 15px auto;
  height: 40px;
`;

const Wrapper = styled(motion.div)<{ isBookmarking: boolean }>`
  padding: 0px 16px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ isBookmarking, theme }) =>
      isBookmarking ? theme.color.primary : theme.color.text};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin-top: 3px;
  }
  svg {
    color: ${({ isBookmarking, theme }) =>
      isBookmarking ? theme.color.primary : theme.color.sub2};

    font-size: 20px;
  }
  border: 1px solid
    ${({ isBookmarking, theme }) =>
      isBookmarking ? theme.color.primary : theme.color.sub2};
  border-radius: 41px;
  cursor: pointer;
  &:hover {
    border: 2px solid #f97393;
  }
`;
