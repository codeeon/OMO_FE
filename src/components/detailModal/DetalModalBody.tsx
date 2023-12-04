import React from 'react';
import styled from 'styled-components';
import { BiSolidMap } from 'react-icons/bi';

const DetalModalBody = () => {
  return (
    <Base>
      <Title>현대백화점 더 현대 서울</Title>
      <PlaceInfo>
        <BiSolidMap />
        <span>서울 영등포구 여의대로 108 더현대 서울</span>
      </PlaceInfo>
      <Text>
        이제는 크리스마스 느낌이 물씬 풍기는 현대백화점 더 현대 서울, 새로이
        단장한 마을은 왠지모르게 따뜻한 느낌이 드는 같은 착각에 빠지는 것
        같아요. 아름다운 이국적인 풍경 속을 거닐고있으면 마치 다른 나라로 여행을
        떠난 듯한 기분을 느낄 수 있을 거에요.
      </Text>
    </Base>
  );
};

export default DetalModalBody;

const Base = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const PlaceInfo = styled.div`
  margin-top: 13px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
`;

const Text = styled.div`
  margin-top: 33px;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%;
  letter-spacing: -0.16px;
  width: 515px;
`;
