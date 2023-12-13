import React from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  refresh_token_expires_in: number;
}

const KakaoLogin: React.FC = () => {
  const queryClient = useQueryClient();

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_APP_KAKAO_API_KEY
    }&redirect_uri=${
      import.meta.env.VITE_APP_KAKAO_REDIRECT_URI
    }&response_type=code`;
  };

  const fetchKakaoToken = async (code: string): Promise<KakaoTokenResponse> => {
    const response = await axios.post<KakaoTokenResponse>(
      'https://kauth.kakao.com/oauth/token',
      `grant_type=authorization_code&client_id=${
        import.meta.env.VITE_APP_KAKAO_API_KEY
      }&redirect_uri=${
        import.meta.env.VITE_APP_KAKAO_REDIRECT_URI
      }&code=${code}`,
    );
    return response.data;
  };

  const handleKakaoLogin = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      const kakaoToken = await fetchKakaoToken(code);
      console.log('Kakao Token:', kakaoToken);
    }
  };

  useQuery('kakaoLogin', handleKakaoLogin, {
    enabled: true,
  });

  return (
    <>
      <LargeBtn
        onClick={loginWithKakao}
        bgColor="#FEE500"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ margin: '13px 0' }}>{kakao}</div>
        <Text style={{ marginLeft: '4px', textAlign: 'center' }} color="#000">
          카카오로 로그인
        </Text>
      </LargeBtn>
    </>
  );
};

export default KakaoLogin;

const LargeBtn = styled.button`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${(props) => props.bgColor || '#f97393'};
  border: none;
  margin: 0 0 12px 0;
  cursor: pointer;
`;

const Text = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.color || '#fff'};
  text-align: center;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  height: 25px;
`;

const kakao = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12.0009 3C17.7999 3 22.501 6.66445 22.501 11.1847C22.501 15.705 17.7999 19.3694 12.0009 19.3694C11.4127 19.3694 10.8361 19.331 10.2742 19.2586L5.86611 22.1419C5.36471 22.4073 5.18769 22.3778 5.39411 21.7289L6.28571 18.0513C3.40572 16.5919 1.50098 14.0619 1.50098 11.1847C1.50098 6.66445 6.20194 3 12.0009 3Z"
      fill="black"
    />
  </svg>
);
