import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Menu from './Menu';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import { BounceLoader } from 'react-spinners';
import useCurrentLocationQuery from '../../../hooks/reactQuery/location/useCurrentLocationQuery';
import useDistrictStore from '../../../store/location/districtStore';
import toast from 'react-hot-toast';

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { district, setDistrict } = useDistrictStore();
  const { isLoading, refetch } = useCurrentLocationQuery(setDistrict);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownHandler = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    isLoading &&
      toast.loading('현재 위치를 업데이트 중입니다...', {
        position: 'top-right',
        style: { fontSize: '14px' },
        id: '1',
      });
    !isLoading && toast.remove('1');
  }, [isLoading]);

  return (
    <NavContainer
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn whileTap={{ scale: 0.97 }} onClick={toggleDropdownHandler}>
        <IconWrapper>
          <SlLocationPin />
        </IconWrapper>
        {isLoading ? (
          <BounceLoader color="#f97393" size={30} />
        ) : (
          <span>{district}</span>
        )}
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <FaCaretDown style={{ color: '#f97393', margin: '3px 0 0 2px' }} />
        </motion.div>
      </DropdownBtn>
      <Menu
        refetch={refetch}
        isOpen={isOpen}
        isLoading={isLoading}
        toggleDropdownHandler={toggleDropdownHandler}
      />
    </NavContainer>
  );
};

export default Location;

const NavContainer = styled(motion.nav)`
  position: relative;
`;

const DropdownBtn = styled(motion.button)<{ width?: string; height?: string }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2px;
  width: ${({ width }) => (width ? width : '145px')};
  height: ${({ height }) => (height ? height : '40px;')};
  padding: 10px 15px;

  border-radius: 41px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.locBg};

  span {
    color: ${({ theme }) => theme.color.locText};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  text-justify: center;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #f97393;
`;
