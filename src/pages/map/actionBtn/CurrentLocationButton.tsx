import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled from 'styled-components';
import { getCurrentCoords } from '../../../function/kakao';
import { CurrentLocationType } from '../../../model/interface';
import AlertModal from '../../../components/Modal/AlertModal';
import LocationAlert from '../../../components/share/alert/LocationAlert';
import useAlertModalCtr from '../../../hooks/useAlertModalCtr';

interface Props {
  setCurrentLocation: React.Dispatch<React.SetStateAction<CurrentLocationType>>;
}

const CurrentLocationButton: React.FC<Props> = ({ setCurrentLocation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isModalOpen, handleModalOpen, handleModalClose } = useAlertModalCtr();

  const moveMyLocation = async () => {
    try {
      setIsLoading(true);
      handleModalOpen();

      const { latitude, longitude } = await getCurrentCoords();
      setCurrentLocation({ lat: latitude, lng: longitude });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BtnWrapper onClick={moveMyLocation}>
        <MdMyLocation />
      </BtnWrapper>
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        position="topRight"
        isLoading={isLoading}
      >
        <LocationAlert isLoading={isLoading} />
      </AlertModal>
    </>
  );
};

export default CurrentLocationButton;

const BtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  right: 45px;
  bottom: 140px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.sub};
  font-size: 26px;
  background: ${({ theme }) => theme.color.bg};
  border: 2px solid ${({ theme }) => theme.color.sub};
  border-radius: 8px;

  width: 40px;
  height: 40px;

  &:hover {
    font-size: 28px;
    background: #d9d9d9;
  }

  cursor: pointer;
`;
