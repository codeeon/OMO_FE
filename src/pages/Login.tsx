import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import KakaoLogin from '../components/auth/KakaoLogin';
import auth from '..//axios/auth';
import useGetKakaoQuery from '../components/auth/signup/useGetKakaoQuery';
import { getKakao } from '../components/auth/signup/useGetKakaoQuery';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginData>();

  const navigate = useNavigate();

  const mutation = useMutation<LoginData, Error, LoginData>(
    async (formData: LoginData) => {
      try {
        const response = await auth.post(`/login`, formData);

        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        const userId = response.data.userId;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('userId', userId);

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data.message || '응답 없음: 로그인에 실패했습니다.',
          alert('아이디와 비밀번호를 확인해주세요!'),
        );
      }
    },
    {
      onSuccess: () => {
        navigate(`/`);
      },
      onError: (error: Error) => {
        // console.error('로그인 실패 -> ', error.message);
        // alert('onError: 아이디와 비밀번호를 확인해주세요!');
      },
    },
  );

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };

  const { data: kakaoData, isError: kakaoError } = useGetKakaoQuery();

  // const handleSocialLogin = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_APP_SERVER_AUTH_URL}/kakao`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     if (response.ok) {
  //       const data = await response.json(); // 엑세스 토큰과 리프레시 토큰을 포함한 응답 데이터
  //       const accessToken = data.accessToken; // 엑세스 토큰 추출
  //       const refreshToken = data.refreshToken; // 리프레시 토큰 추출
  //       // const userId = data.userId; //
  //       // 받은 토큰들을 로컬 스토리지 등에 저장하여 활용
  //       localStorage.setItem('accessToken', accessToken);
  //       localStorage.setItem('refreshToken', refreshToken);
  //       // sessionStorage.setItem('userId', userId);
  //       // 받은 토큰들을 활용하여 로그인 상태 관리 또는 인증 등의 작업 수행
  //       // ...
  //     } else {
  //       console.error('소셜 로그인 실패:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('소셜 로그인 요청 중 오류 발생:', error);
  //   }
  // };

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
            <Text $color="btn">로그인</Text>
          </LargeBtn>
        </form>
        <KakaoLogin />

        {/* <Link > */}
        {/* <LargeBtn onClick={navigate('/')} type="button"></LargeBtn> */}
        {/* </Link> */}
        {/* <LargeBtn onClick={handleSocialLogin} /> */}
        <OrLine>
          <div>{line}</div>
          <div>
            <Text $color="sub2">or</Text>
          </div>
          <div>{line}</div>
        </OrLine>
        <div>
          <Text $color="sub">아직 회원이 아니신가요?</Text>
          <Link to="/signup">
            <Text style={{ marginLeft: '11px' }} color="link">
              회원가입
            </Text>
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

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
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
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.cardBg};
  margin-top: 20px;
  padding: 0 15px;
  &::placeholder {
    color: ${({ theme }) => theme.color.sub};
    font-size: 14px;
    font-weight: 700;
  }
  color: ${({ theme }) => theme.color.text};
`;

const LargeBtn = styled.button`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #f97393;
  border: none;
  margin: 0 0 12px 0;
  cursor: pointer;
`;

const Text = styled.div<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ $color, theme }) =>
    $color === 'sub2'
      ? theme.color.sub2
      : $color === 'sub'
      ? theme.color.sub
      : $color === 'text'
      ? theme.color.text
      : $color === 'btn'
      ? '#fff'
      : theme.color.link};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  height: 25px;
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
