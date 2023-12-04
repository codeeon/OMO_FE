import React from 'react';
import styled from 'styled-components';
import DetailModalHeader from './DetailModalHeader';
import DetailModalBody from './DetalModalBody';
import DetailModalFooter from './DetailModalFooter';

const DetailContentsModal = () => {
  return (
    <Base>
      <DetailModalHeader />
      <ImageContainer />
      <DetailModalBody />
      <DetailModalFooter />
    </Base>
  );
};

export default DetailContentsModal;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: calc(700px - 50px);
  height: calc(1120px - 50px);
  background-color: #fff;
  border-radius: 16px;

  padding: 50px;
  z-index: 99;
`;

const ImageContainer = styled.div`
  margin-top: 16px;
  width: 655px;
  height: 610px;
  border-radius: 16px;
  background: #d9d9d9;
`;
