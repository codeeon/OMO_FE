import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  nickname: string;
  email: string;
  password: string;
}

interface SignupData extends UserData {
  password2: string;
}

const Signup: React.FC = () => {
  const { register, handleSubmit } = useForm<SignupData>();
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, UserData>(
    async (data: UserData): Promise<void> => {
      const res = await axios.post(`https://tonadus.shop/auth/register`, data); // `${import.meta.env.VITE_APP_SERVER_URL}/auth/register`
      console.log(res.data);
    },
    {
      onSuccess: () => {
        alert('회원가입을 완료하였습니다.');
        navigate('/login');
      },
    },
  );

  const onClickSubmit = (data: SignupData): void => {
    mutation.mutate(data);
  };

  return (
    <Base>
      <RegisterBox>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <div>
            <Input
              width="254px"
              placeholder="닉네임을 입력해 주세요."
              type="text"
              {...register('nickname')}
            />
            <SmallBtn type="button">중복체크</SmallBtn>
          </div>
          <div>
            <Input
              placeholder="이메일을 입력해 주세요."
              type="text"
              {...register('email')}
            />
          </div>
          <div>
            <Input
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              {...register('password')}
            />
          </div>
          <div>
            <Input
              placeholder="비밀번호를 다시 입력해 주세요."
              type="password"
              {...register('password2')}
            />
          </div>
          <div>
            <LargeBtn>회원가입 완료</LargeBtn>
          </div>
        </form>
        <div>
          <Text>기존 회원이신가요?</Text>
          <Link
            style={{ textDecoration: 'none', marginLeft: '10px' }}
            to="/login"
          >
            <Text color="#44a5ff">로그인</Text>
          </Link>
        </div>
      </RegisterBox>
    </Base>
  );
};

export default Signup;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterBox = styled.div`
  width: 620px;
  height: 754px;
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
  margin: 83px 0 45px 0;
`;

const SmallBtn = styled.button`
  width: 106px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #f97393;
  margin-left: 10px;
  color: #f97393;
  text-align: center;
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
`;

const Input = styled.input`
  width: ${(props) => props.width || '370px'};
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-top: 30px;
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
  background: #f97393;
  border: none;
  margin: 60px 0;
  color: #fff;
  text-align: center;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
`;

const Text = styled.span`
  color: ${(props) => props.color || '#666'};
  text-align: center;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;
