import React from 'react';
import styled from 'styled-components';

import useModalCtr from '../../../hooks/useModalCtr';
import PlaceInfoModal from '../../main/hotContents/placeInfo/PlaceInfoModal';
import LocationModal from '../../Modal/LocationModal';

const PlaceCard = ({ placeData }) => {
  const data = placeData.Location;
  const image = placeData.Location.Posts[0].imgUrl[0];

  const { isModalOpen, handleModalClose, handleModalOpen } = useModalCtr();
  const post = {
    imgUrl: image,
    Location: data,
    content: data.Posts,
    Category: data.Category,
  };

  return (
    <Card onClick={(e) => handleModalOpen(e)}>
      <Img src={image} alt=""></Img>
      <Title>
        <Name>{data.storeName}</Name>
        <Category style={{ marginLeft: '4px' }}>
          {data.Category.categoryName}
        </Category>

        <Mark>{mark}</Mark>
      </Title>
      <Address>
        <Pin>{pin}</Pin>
        <AddressName>{data.address}</AddressName>
      </Address>
      <Counts>
        <Star>{star}</Star>
        <Count>
          <Text>별점</Text>
          <Bold>{data.starAvg}</Bold>
        </Count>
        <Count style={{ marginLeft: '10px' }}>
          <Text>게시글</Text>
          <Bold>{data.postCount}</Bold>
        </Count>
      </Counts>
      <LocationModal isOpen={isModalOpen} onClose={handleModalClose}>
        <PlaceInfoModal handleModalClose={handleModalClose} post={post} />
      </LocationModal>
    </Card>
  );
};

export default PlaceCard;

const Card = styled.div`
  box-sizing: border-box;
  width: 285px;
  height: 262px;
  cursor: pointer;
`;

const Img = styled.img`
  box-sizing: border-box;
  width: 285px;
  height: 168px;
  margin-bottom: 12px;
  border-radius: 16px;
  border: none;
  object-fit: cover;
`;

const Title = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 8px;
`;

const Name = styled.div`
  color: var(--light-1_txt, #111);
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Category = styled.div`
  color: var(--light-2_sub, #595959);
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  min-width: 30px;
`;

const Mark = styled.div`
  margin-left: auto;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const mark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.8201 2H7.18007C5.05007 2 3.32007 3.74 3.32007 5.86V19.95C3.32007 21.75 4.61007 22.51 6.19007 21.64L11.0701 18.93C11.5901 18.64 12.4301 18.64 12.9401 18.93L17.8201 21.64C19.4001 22.52 20.6901 21.76 20.6901 19.95V5.86C20.6801 3.74 18.9501 2 16.8201 2Z"
      fill="#F97393"
    />
  </svg>
);

const unmark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
      stroke="#7B7B7B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
      stroke="#7B7B7B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Address = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  color: var(--link, #44a5ff);
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const Pin = styled.span`
  width: 18px;
  height: 18px;
  margin-right: 4px;
  padding-bottom: 3px;
`;
const pin = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M15.4649 6.3375C14.6774 2.8725 11.6549 1.3125 8.99995 1.3125C8.99995 1.3125 8.99995 1.3125 8.99245 1.3125C6.34495 1.3125 3.31495 2.865 2.52745 6.33C1.64995 10.2 4.01995 13.4775 6.16495 15.54C6.95995 16.305 7.97995 16.6875 8.99995 16.6875C10.0199 16.6875 11.0399 16.305 11.8274 15.54C13.9724 13.4775 16.3424 10.2075 15.4649 6.3375ZM8.99995 10.095C7.69495 10.095 6.63745 9.0375 6.63745 7.7325C6.63745 6.4275 7.69495 5.37 8.99995 5.37C10.3049 5.37 11.3624 6.4275 11.3624 7.7325C11.3624 9.0375 10.3049 10.095 8.99995 10.095Z"
      fill="#44A5FF"
    />
  </svg>
);

const AddressName = styled.div`
  height: 20px;
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Counts = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Star = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 2px;
  padding-bottom: 2px;
`;
const star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M9.15327 2.33977L10.3266 4.68643C10.4866 5.0131 10.9133 5.32643 11.2733 5.38643L13.3999 5.73977C14.7599 5.96643 15.0799 6.9531 14.0999 7.92643L12.4466 9.57977C12.1666 9.85977 12.0133 10.3998 12.0999 10.7864L12.5733 12.8331C12.9466 14.4531 12.0866 15.0798 10.6533 14.2331L8.65994 13.0531C8.29994 12.8398 7.70661 12.8398 7.33994 13.0531L5.34661 14.2331C3.91994 15.0798 3.05327 14.4464 3.42661 12.8331L3.89994 10.7864C3.98661 10.3998 3.83327 9.85977 3.55327 9.57977L1.89994 7.92643C0.926606 6.9531 1.23994 5.96643 2.59994 5.73977L4.72661 5.38643C5.07994 5.32643 5.50661 5.0131 5.66661 4.68643L6.83994 2.33977C7.47994 1.06643 8.51994 1.06643 9.15327 2.33977Z"
      fill="#F97393"
    />
  </svg>
);

const Count = styled.div`
  display: flex;
  gap: 4px;
`;

const Text = styled.div`
  color: var(--light-2_sub, #595959);
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
`;

const Bold = styled.div`
  color: var(--light-1_txt, #111);
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 16px */
`;
