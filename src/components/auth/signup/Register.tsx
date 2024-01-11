import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import api from '../../../axios/api';
import Check from './Check';

import Input1 from '../../input/authInput/Input1';
import LargeButton from '../../button/authButton/LargeButton';
import SmallButton from '../../button/authButton/SmallButton';
import Text1 from '../../text/Text1';

interface RegisterProps {
  confirmedEmail: string;
  setRegisterPage: React.Dispatch<React.SetStateAction<number>>;
}

interface UserEmail {
  email: string;
}

interface SignUpData {
  nickname?: string;
  password: string;
  confirmedPassword: string;
}

interface UserData extends UserEmail, SignUpData {}

const Register: React.FC = (props: RegisterProps) => {
  const { confirmedEmail, setRegisterPage } = props;

  const { register, handleSubmit, setError, trigger } = useForm<SignUpData>({
    mode: 'onChange',
  });

  const [nickname, setNickname] = useState<string>('');

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
      : nicknameCheck === 'retry'
      ? '닉네임 중복체크를 다시 진행해주세요.'
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

  const onValidNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    nicknameCheck === 'confirmed' && setNicknameCheck('retry');
  };

  const onValidPw = async (data: SignUpData) => {
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
      const checkNicknameResponse = await api.post('/auth/check-nickname', {
        nickname,
      });
    },
    {
      onSuccess: () => {
        setConfirmedNickname(nickname);
        setNicknameCheck('confirmed');
      },
      onError: () => {
        setNicknameCheck('rejected');
      },
    },
  );

  const signupMutation = useMutation<void, Error, UserData>(
    async (data: UserData): Promise<void> => {
      const response = await api.post(`/auth/register`, data);
    },
    {
      onSuccess: () => {
        setRegisterPage('가입완료');
      },
    },
  );

  const onClickSubmit = async (data: UserData): Promise<void> => {
    data.email = confirmedEmail;
    data.nickname = confirmedNickname;

    await onValidPw(data);

    if (allValidated) {
      signupMutation.mutate(data);
    }
  };

  return (
    <>
      <InputBox>
        <div>
          <div>
            <Input1
              $check={nicknameCheck}
              $width="284px"
              placeholder="닉네임을 입력해 주세요.  (2~15자)"
              type="text"
              value={nickname}
              onChange={onValidNickname}
            />
            <SmallButton
              onClick={() => checkNicknameMutation.mutate(nickname)}
              type="button"
            >
              중복체크
            </SmallButton>
          </div>
          <Check verifyCheck={nicknameCheck}>{checkingNickname}</Check>
        </div>
        <Form onChange={handleSubmit(onValidPw)}>
          <div>
            <div>
              <Input1
                $check={passwordCheck}
                placeholder="비밀번호를 입력해 주세요.  (6자 이상, 영문, 숫자 필수)"
                type="password"
                {...register('password')}
              />
            </div>
            <Check verifyCheck={passwordCheck}>{checkingPassword}</Check>
          </div>
          <div>
            <div>
              <Input1
                $check={confirmedPasswordCheck}
                placeholder="비밀번호를 한 번 더 입력해 주세요."
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
          <LargeButton
            type="button"
            onClick={handleSubmit(onClickSubmit)}
            $validation={allValidated}
          >
            회원가입 완료
          </LargeButton>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text1 $color="sub">기존 회원이신가요?</Text1>
          <Link
            style={{ textDecoration: 'none', marginLeft: '10px' }}
            to="/login"
          >
            <Text1 $color="link">로그인</Text1>
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
