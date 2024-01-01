import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import auth from '..//..//..//axios/auth';
import useInput from '../../../hooks/useInput';
import Check from './Check';

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

  const { register, handleSubmit, setError, trigger } = useForm<SignUpData>({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const [nickname, setNickname, onChangeNickname] = useInput('');

  const [nicknameCheck, setNicknameCheck] = useState<string>('');
  const [confirmedNickname, setConfirmedNickname] = useState<string>('');

  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [confirmedPasswordCheck, setConfirmedPasswordCheck] =
    useState<string>('');

  const allValidated =
    nicknameCheck === 'confirmed' &&
    passwordCheck === 'confirmed' &&
    confirmedPasswordCheck === 'confirmed';

  const checkingNickname =
    nicknameCheck === 'rejected'
      ? '이미 사용 중이거나 사용할 수 없는 닉네임입니다.'
      : nicknameCheck === 'confirmed'
      ? '사용할 수 있는 닉네임입니다.'
      : '';
  const checkingPassword =
    passwordCheck === 'rejected'
      ? '반드시 영문과 숫자를 포함해 6자 이상 입력해야 합니다.'
      : passwordCheck === 'confirmed'
      ? '사용 가능한 비밀번호입니다.'
      : '';
  const checkingConfirmedPassword =
    confirmedPasswordCheck === 'rejected'
      ? '비밀번호가 일치하지 않습니다.'
      : confirmedPasswordCheck === 'confirmed'
      ? '비밀번호가 일치합니다.'
      : '';

  const onValid = async (data: SignUpData) => {
    if (
      data.password.length > 5 &&
      /[a-zA-Z]/.test(data.password) &&
      /\d/.test(data.password)
    ) {
      setPasswordCheck('confirmed');
    } else {
      setPasswordCheck('rejected');
      setError('password');
    }

    if (data.password.length > 0 && data.password === data.confirmedPassword) {
      setConfirmedPasswordCheck('confirmed');
    } else {
      setConfirmedPasswordCheck('rejected');
      setError('confirmedPassword');
    }

    if (!data.password.length) {
      setPasswordCheck('');
    }

    if (!data.confirmedPassword.length) {
      setConfirmedPasswordCheck('');
    }

    await trigger(['password', 'confirmedPassword']);
  };

  const checkNicknameMutation = useMutation(
    async (nickname: string): Promise<void> => {
      // console.log(nickname);
      const checkNicknameResponse = await auth.post('/check-nickname', {
        nickname,
      });
      // console.log('닉네임 체크 응답 -> ', checkNicknameResponse);
    },
    {
      onSuccess: () => {
        setNicknameCheck('confirmed');
        setConfirmedNickname(nickname);
      },
      onError: () => {
        setNicknameCheck('rejected');
      },
    },
  );

  const signupMutation = useMutation<void, Error, UserData>(
    async (data: UserData): Promise<void> => {
      const response = await auth.post(`/register`, data);
    },
    {
      onSuccess: () => {
        alert('회원가입을 완료하였습니다.');
        navigate('/login');
      },
    },
  );

  const onClickSubmit = async (data: SignUpData): void => {
    data.email = confirmedEmail;
    data.nickname = confirmedNickname;

    await onValid(data);

    if (allValidated) {
      signupMutation.mutate(data);
    }
  };

  return (
    <>
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
        <Form onChange={handleSubmit(onValid)}>
          <div>
            <div>
              <Input
                check={passwordCheck}
                placeholder="비밀번호를 입력해 주세요."
                type="password"
                {...register('password')}
              />
            </div>
            <Check verifyCheck={passwordCheck}>{checkingPassword}</Check>
          </div>

          <div>
            <div>
              <Input
                check={confirmedPasswordCheck}
                placeholder="비밀번호를 다시 입력해 주세요."
                type="password"
                {...register('confirmedPassword')}
              />
            </div>
            <Check verifyCheck={confirmedPasswordCheck}>
              {checkingConfirmedPassword}
            </Check>
          </div>
        </Form>
      </InputBox>
      <div style={{ height: '214px' }}>
        <div>
          <LargeBtn
            type="button"
            onClick={handleSubmit(onClickSubmit)}
            validation={allValidated}
          >
            회원가입 완료
          </LargeBtn>
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
    </>
  );
};

export default Register;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 380px;
  padding-top: 58px;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 380px;
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
  background-color: ${({ theme }) => theme.color.locBg};
`;

const Input = styled.input`
  width: ${({ width }) => width || '400px'};
  color: ${({ theme }) => theme.color.text};
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.border};
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
  background: ${({ validation }) =>
    validation ? 'var(--primary, #f97393)' : 'var(--light-5_btn_bg, #B1B1B1)'};
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
