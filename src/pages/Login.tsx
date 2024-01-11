import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from '../components/auth/KakaoLogin';
import api from '..//axios/api';
import toast from 'react-hot-toast';

import Input1 from '../components/input/authInput/Input1';
import Text1 from '../components/text/Text1';
import LargeButton from '../components/button/authButton/LargeButton';
import Title1 from '../components/text/Title1';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginData>();

  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    userId && navigate('/');
  }, []);

  const mutation = useMutation<LoginData, Error, LoginData>(
    async (formData: LoginData) => {
      const response = await api.post(`/auth/login`, formData);

      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.refreshtoken;
      const userId = response.data.userId;

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('userId', userId);

      return response.data;
    },
    {
      onSuccess: () => {
        navigate(`/`);
      },
      onError: (error: Error) => {
        toast.error('아이디와 비밀번호를 확인해주세요!', {
          position: 'bottom-right',
          duration: 4000,
        });
      },
    },
  );

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };

  return (
    <Base>
      <LoginBox>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <Input
              placeholder="이메일을 입력해주세요."
              type="email"
              autoComplete="none"
              {...register('email')}
            />
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              {...register('password')}
            />
          </InputBox>
          <LargeBtn>
            <Text1 $color="btn">로그인</Text1>
          </LargeBtn>
        </form>
        <KakaoLogin />
        <OrLine>
          <div>{line}</div>
          <div>
            <Text1 $color="sub2">or</Text1>
          </div>
          <div>{line}</div>
        </OrLine>
        <div style={{ display: 'flex' }}>
          <Text1 $color="sub2">아직 회원이 아니신가요?</Text1>
          <Text1
            onClick={() => navigate('/signup')}
            style={{ marginLeft: '11px', cursor: 'pointer' }}
            $color="link"
          >
            회원가입
          </Text1>
        </div>
      </LoginBox>
    </Base>
  );
};

export default Login;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.bg};
  position: relative;
`;

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  width: 620px;
  height: 700px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.color.cardBg};
`;

const Title = styled(Title1)`
  margin: 83px 0 26px 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
  padding-top: 20px;
`;

const Input = styled(Input1)`
  margin-top: 20px;
`;

const LargeBtn = styled(LargeButton)`
  background: #f97393;
  margin: 0 0 12px 0;
`;

const OrLine = styled.div`
  width: 300px;
  height: 8px;
  margin: 40px 0 60px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const line = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="133"
    height="2"
    viewBox="0 0 133 2"
    fill="none"
  >
    <path d="M0 1L133 1.00001" stroke="#D9D9D9" />
  </svg>
);
