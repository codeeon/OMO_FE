import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginData>();
  const navigate = useNavigate();

  const mutation = useMutation(
    async (formData: LoginData) => {
      const response = await axios.post(`/auth/login`, formData);
      // `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`
      if (response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken, {
          secure: window.location.protocol === 'https:',
          httpOnly: true,
        });
      }
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      return response.data;
    },
    {
      onSuccess: () => {
        // 로그인 성공 (redirect)
        navigate(`/`); // `${import.meta.env.VITE_APP_SERVER_URL}/`
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
              {...register('email')}
            />
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              {...register('password')}
            />
          </InputBox>
          <LargeBtn type="submit">
            <Text>로그인</Text>
          </LargeBtn>
        </form>
        <LargeBtn
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
        <OrLine>
          <div>{line}</div>{' '}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Text color="#AEAEAE">or</Text>
          </div>
          <div>{line}</div>
        </OrLine>
        <div>
          <Text color="#666">아직 회원이 아니신가요?</Text>
          <Link
            style={{ textDecoration: 'none', marginLeft: '10px' }}
            to="/signin"
          >
            <Text color="#44a5ff">회원가입</Text>
          </Link>
        </div>
      </LoginBox>
    </Base>
  );
};

export default Login;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 620px;
  height: 703px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Wanted Sans;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin: 83px 0 26px 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 370px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-top: 20px;
  padding: 0 15px;
  &::placeholder {
    color: #a5a5a5;
    font-family: Wanted Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
  }
`;

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
