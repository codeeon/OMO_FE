import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';

const MapSearchInput = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const ps = new kakao.maps.services.Places();

  const onClichHandler = () => {
    ps.keywordSearch(value, placesSearchCB);
  };

  function placesSearchCB(data: any, status: any, pagination: any) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      setResult(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }

  return (
    <Base>
      <Input
        value={value}
        onChange={(e) => onChangeValue(e)}
        placeholder="찾고 싶은 장소를 입력해보세요."
      />
      <Btn onClick={onClichHandler}>
        <CgSearch />
      </Btn>
    </Base>
  );
};

export default MapSearchInput;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 32px;
`;

const Input = styled.input`
  margin: 5px 20px;
  width: 80%;
  height: 80%;
  border: none;
  outline: none;

  font-size: 16px;
`;

const Btn = styled.div``;
