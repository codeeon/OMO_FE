import React, { useEffect, useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '../axios/api';
import Check from '../components/auth/signup/Check';
import Register from '../components/auth/signup/Register';
import Done from '../components/auth/signup/Done';
import toast from 'react-hot-toast';

import Input1 from '../components/input/authInput/Input1';
import LargeButton from '../components/button/authButton/LargeButton';
import SmallButton from '../components/button/authButton/SmallButton';
import Text1 from '../components/text/Text1';
import Title1 from '../components/text/Title1';

// 이 타입은 중복 사용이 되니까, 분리해서 재사용하면 좋을 듯
type Checking = 'rejected' | 'confirmed' | 'retry' | '';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    userId && (alert('로그아웃 후 이용해 주세요.'), navigate('/'));
  }, []);

  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  // union type
  const [emailCheck, setEmailCheck] = useState<Checking>('');
  const [codeCheck, setCodeCheck] = useState<Checking>('');

  const [confirmedEmail, setConfirmedEmail] = useState<string>('');
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [registerPage, setRegisterPage] = useState<
    '이메일 인증' | '회원가입' | '가입완료'
  >('이메일 인증'); // enum

  const title =
    registerPage === '이메일 인증'
      ? '이메일 인증'
      : registerPage === '회원가입'
      ? '회원가입'
      : null;
  const checkingEmail =
    emailCheck === 'rejected'
      ? '올바른 이메일이 아니거나, 이미 가입한 이메일입니다.'
      : emailCheck === 'confirmed'
      ? '전송된 메일의 인증번호를 입력해주세요.'
      : emailCheck === 'retry'
      ? '이메일 인증을 다시 진행해주세요.'
      : '';
  const checkingCode =
    codeCheck === 'rejected'
      ? '인증번호를 다시 확인해주세요.'
      : codeCheck === 'confirmed'
      ? '전송된 메일의 인증번호를 입력해주세요.'
      : '';

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    (emailCheck === 'confirmed' || codeCheck === 'confirmed') &&
      (setEmailCheck('retry'), setCodeCheck(''), setIsValidated(false));
  };
  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    codeCheck === 'confirmed' &&
      (setEmailCheck('retry'), setCodeCheck(''), setIsValidated(false));
  };

  const checkEmailMutation = useMutation(
    async (email: string): Promise<void> => {
      const checkEmailResponse = await api.post('/auth/verify-email', {
        email,
      });
    },
    {
      onMutate: () => {
        if (email.includes('@') && email.split('@')[1].includes('.')) {
          setEmailCheck('confirmed');
        } else {
          setEmailCheck('rejected');
        }
        toast.loading('메일을 확인 중입니다.', {
          position: 'bottom-right',
          duration: 4000,
        });
      },
      onSuccess: () => {
        emailCheck === 'confirmed' ? setEmailCheck('confirmed') : null;
        toast.success('인증메일이 전송되었습니다.', {
          position: 'bottom-right',
          duration: 4000,
        });
      },
      onError: () => {
        setEmailCheck('rejected');
        toast.error('인증메일 전송에 실패하였습니다.', {
          position: 'bottom-right',
          duration: 4000,
        });
      },
    },
  );

  const checkCodeMutation = useMutation(
    async (code: string): Promise<void> => {
      const checkCodeResponse = await api.post(
        '/auth/verify-authentication-code',
        {
          authenticationCode: code,
          email,
        },
      );
    },
    {
      onSuccess: () => {
        setConfirmedEmail(email);
        setCodeCheck('confirmed');
        setIsValidated(true);
      },
      onError: () => {
        setCodeCheck('rejected');
      },
    },
  );

  const onClickNextStep = () => {
    isValidated && emailCheck === 'confirmed' && codeCheck === 'confirmed'
      ? setRegisterPage('회원가입')
      : emailCheck === 'confirmed'
      ? setCodeCheck('rejected')
      : setEmailCheck('rejected');
  };

  return (
    <Base>
      <RegisterBox>
        {registerPage === '가입완료' ? (
          <Done />
        ) : (
          <div>
            <Title>{title}</Title>
            <Step>
              <Number
                onClick={() => setRegisterPage('이메일 인증')}
                $validation={true}
                style={{ cursor: 'pointer' }}
              >
                1
              </Number>
              <Bar $validation={isValidated} />
              <Number
                onClick={onClickNextStep}
                $validation={registerPage === '회원가입'}
              >
                2
              </Number>
            </Step>
            {registerPage === '회원가입' ? (
              <Register
                confirmedEmail={confirmedEmail}
                setRegisterPage={setRegisterPage}
              />
            ) : (
              <div>
                <EmailBox>
                  <InputBox>
                    <div>
                      <div>
                        <Input1
                          $check={emailCheck}
                          $width="284px"
                          placeholder="이메일을 입력해 주세요"
                          value={email}
                          onChange={onChangeEmail}
                          type="text"
                        />
                        <SmallButton
                          onClick={() => checkEmailMutation.mutate(email)}
                        >
                          인증메일 전송
                        </SmallButton>
                      </div>
                      <Check verifyCheck={emailCheck}>{checkingEmail}</Check>
                    </div>
                    <div>
                      <div>
                        <Input1
                          $check={codeCheck}
                          $width="284px"
                          placeholder="인증번호를 입력해 주세요"
                          value={code}
                          onChange={onChangeCode}
                          type="text"
                        />
                        <SmallButton
                          onClick={() => checkCodeMutation.mutate(code)}
                        >
                          인증번호 확인
                        </SmallButton>
                      </div>
                      <Check verifyCheck={codeCheck}>{checkingCode}</Check>
                    </div>
                  </InputBox>
                  <Retry>
                    <Text1 $color="sub" $fontSize="14px">
                      이메일이 오지 않았나요?
                    </Text1>
                    <Text1
                      $fontSize="14px"
                      $color="link"
                      onClick={() => checkEmailMutation.mutate(email)}
                      style={{ cursor: 'pointer' }}
                    >
                      인증메일 재전송
                    </Text1>
                  </Retry>
                </EmailBox>
                <div style={{ height: '214px' }}>
                  <div>
                    <LargeButton
                      onClick={onClickNextStep}
                      $validation={isValidated}
                    >
                      다음
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
              </div>
            )}
          </div>
        )}
      </RegisterBox>
    </Base>
  );
};

export default SignUp;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.bg};
`;

const RegisterBox = styled.div`
  box-sizing: border-box;
  width: 620px;
  height: 754px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.color.cardBg};
`;

const Title = styled(Title1)`
  margin: 83px 0 25px 0;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const Number = styled.div<{ $validation: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${({ $validation, theme }) =>
    $validation ? theme.color.primary : theme.color.border};
  color: ${({ $validation, theme }) =>
    $validation ? theme.color.bg : theme.color.bg};
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
`;

const Bar = styled.div<{ $validation: boolean }>`
  width: 26px;
  height: 2px;
  flex-shrink: 0;
  background: ${({ $validation, theme }) =>
    $validation ? theme.color.primary : theme.color.border};
`;

const EmailBox = styled.div`
  box-sizing: border-box;
  padding-top: 117px;
  height: 380px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
`;

const Retry = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding-top: 12px;
  box-sizing: border-box;
`;

// const Text = styled.div<{
//   $color?: string;
//   $fontSize?: string;
//   $fontWeight?: string;
// }>`
//   color: ${({ $color }) => $color || '#666'};
//   text-align: center;
//   font-size: ${({ $fontSize }) => $fontSize || '16px'};
//   font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
//   box-sizing: border-box;
// `;
