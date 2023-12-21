import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../axios/auth';
import useInput from '../hooks/useInput';
import Check from '../components/auth/signup/Check';

interface UserEmail {
  email: string;
}

interface SignUpData {
  nickname?: string;
  password: string;
  confirmedPassword: string;
}

interface UserData extends UserEmail, SignUpData {}

const Register: React.FC = (props: string) => {
  const { confirmedEmail } = props;

  const [nickname, setNickname, onChangeNickname] = useInput();

  const [password, setPassword] = useState('');
  // , onChangePassword] = useInput();
  const [confirmedPassword, setConfirmedPassword] = useState('');
  // , onChangeConfimedPassword] = useInput();

  const [nicknameCheck, setNicknameCheck] = useState<string>('');
  const [confirmedNickname, setConfirmedNickname] = useState<string>('');

  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [confirmedPasswordCheck, setConfirmedPasswordCheck] =
    useState<string>('');

  const checkingNickname =
    nicknameCheck === 'rejected'
      ? '이미 사용 중인 닉네임입니다.'
      : nicknameCheck === 'confirmed'
      ? '사용할 수 있는 닉네임입니다.'
      : '';
  const checkingPassword =
    passwordCheck === 'rejected'
      ? '6자 이상, 영문과 숫자 입력이 필수입니다.'
      : passwordCheck === 'confirmed'
      ? '사용 가능한 비밀번호입니다.'
      : '';
  const checkingConfirmedPassword =
    confirmedPasswordCheck === 'rejected'
      ? '비밀번호가 일치하지 않습니다.'
      : confirmedPasswordCheck === 'confirmed'
      ? '비밀번호가 일치합니다.'
      : '';

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpData>({ mode: 'onBlur' });

  // let passwordErrorMessage;
  // let confirmedPasswordErrorMessage;

  const navigate = useNavigate();

  const checkNicknameMutation = useMutation(
    async (nickname: string): Promise<void> => {
      console.log(nickname);
      const checkNicknameResponse = await auth.post('/check-nickname', {
        nickname,
      });
      console.log('닉네임 체크 응답 -> ', checkNicknameResponse);
    },
    {
      onSuccess: () => {
        setNicknameCheck('confirmed');
        setConfirmedNickname('nickname');
      },
      onError: () => {
        setNicknameCheck('rejected');
      },
    },
  );

  const signupMutation = useMutation<void, Error, UserData>(
    async (data: UserData): Promise<void> => {
      console.log(data);
      const response = await auth.post(`/register`, data);
      console.log(response);
    },
    {
      onSuccess: () => {
        alert('회원가입을 완료하였습니다.');
        navigate('/login');
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const onClickSubmit = (data: SignUpData): void => {
    data.email = confirmedEmail;
    data.nickname = confirmedNickname;
    signupMutation.mutate(data);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    register('password', { required: true, minLength: 6 })(e);
  };
  const onChangeConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
    register('confirmedPassword', { required: true, minLength: 6 })(e);
  };

  return (
    <Form onSubmit={handleSubmit(onClickSubmit)}>
      <InputBox>
        <div>
          <div>
            <Input
              check={nicknameCheck}
              width="284px"
              placeholder="닉네임을 입력해 주세요."
              type="text"
              value={nickname}
              onChange={onChangeNickname}
              // {...register('nickname', {
              //   required: true,
              //   minLength: 2,
              //   maxLength: 15,
              // })}
            />
            <SmallBtn
              onClick={() => checkNicknameMutation.mutate(nickname)}
              type="button"
            >
              중복체크
            </SmallBtn>
          </div>
          <Check verifyCheck={nicknameCheck}>{checkingNickname}</Check>
        </div>
        <div>
          <div>
            <Input
              // value={password}
              // onChange={onChangePassword}
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
          </div>
          <Check verifyCheck={passwordCheck}>{checkingPassword}</Check>
        </div>
        <div>
          <div>
            <Input
              // value={confirmedPassword}
              // onChange={onChangeConfirmedPassword}
              placeholder="비밀번호를 다시 입력해 주세요."
              type="password"
              {...register('confirmedPassword', {
                required: true,
                minLength: 6,
              })}
            />
          </div>
          <Check verifyCheck={confirmedPasswordCheck}>
            {checkingConfirmedPassword}
          </Check>
        </div>
      </InputBox>
      <div style={{ height: '214px' }}>
        <div>
          <LargeBtn yet={nicknameCheck === 'confirmed'}>회원가입 완료</LargeBtn>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>기존 회원이신가요?</Text>
          <Link
            style={{ textDecoration: 'none', marginLeft: '10px' }}
            to="/login"
          >
            <Text color="#44a5ff">로그인</Text>
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default Register;

const Form = styled.form``;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 380px;
  padding-top: 58px;
  gap: 30px;
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
  box-sizing: border-box;
`;

const Input = styled.input`
  width: ${({ width }) => width || '400px'};
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  border-color: ${({ check }) =>
    check === 'rejected'
      ? 'var(--error_accent, #FF3263)'
      : check === 'confirmed'
      ? '#0BD961'
      : '#D9D9D9'};
  background: none;
  padding: 0 15px;
  &::placeholder {
    color: #a5a5a5;
    font-family: Wanted Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
  }
  box-sizing: border-box;
`;

const LargeBtn = styled.button`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${({ yet }) =>
    yet ? 'var(--light-5_btn_bg, #B1B1B1)' : 'var(--primary, #f97393)'};
  border: none;
  margin: 0 0 61px 0;
  color: #fff;
  text-align: center;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  box-sizing: border-box;
`;

const Text = styled.span`
  color: ${(props) => props.color || '#666'};
  text-align: center;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  box-sizing: border-box;
`;
