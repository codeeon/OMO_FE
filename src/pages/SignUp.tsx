import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../axios/auth';
import useInput from '../hooks/useInput';
import Check from '../components/auth/signup/Check';
import Register from '../components/auth/signup/Register';
import Done from '../components/auth/signup/Done';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    userId && (alert('회원가입은 로그아웃 후 이용해 주세요.'), navigate('/'));
  }, []);

  const [email, setEmail] = useState<string>();

  const { value: code, changeValueHandler: onChangeCode } = useInput();

  const [emailCheck, setEmailCheck] = useState<string>('');
  const [codeCheck, setCodeCheck] = useState<string>('');

  const [confirmedEmail, setConfirmedEmail] = useState<string>('');
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [registerPage, setRegisterPage] = useState<number>(1);

  const title =
    registerPage === 2 ? '회원가입' : registerPage === 1 ? '이메일 인증' : null;
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

  // emailCheck === 'confirmed'에서, email이 수정되었을 때(email !== confirmedEmail),
  // codeCheck === 'confirmed'에서, email이 수정되었을 때(email !== confirmedEmail)
  const onValid = () => {
    emailCheck === 'confirmed' || codeCheck === 'confirmed'
      ? email !== confirmedEmail
        ? setEmailCheck('retry')
        : null
      : null;
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    onValid();
  };

  const checkEmailMutation = useMutation(
    async (email: string): Promise<void> => {
      // console.log(email);
      const checkEmailResponse = await auth.post('/verify-email', { email });
      // console.log('이메일 체크 응답 -> ', checkEmailResponse);
    },
    {
      onMutate: () => {
        if (email.includes('@') && email.split('@')[1].includes('.')) {
          setEmailCheck('confirmed');
        } else {
          setEmailCheck('rejected');
        }
      },
      onSuccess: () => {
        emailCheck !== 'retry' && setEmailCheck('confirmed');
      },
      onError: () => {
        setEmailCheck('rejected');
      },
    },
  );

  const checkCodeMutation = useMutation(
    async (code: string): Promise<void> => {
      // console.log(code);
      const checkCodeResponse = await auth.post('/verify-authentication-code', {
        authenticationCode: code,
        email,
      });
      // console.log('코드 체크 응답 -> ', checkCodeResponse);
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
    isValidated
      ? setRegisterPage(2)
      : emailCheck === 'confirmed'
      ? setCodeCheck('rejected')
      : setEmailCheck('rejected');
  };

  return (
    <Base>
      <RegisterBox>
        {registerPage === 3 ? (
          <Done setRegisterPage={setRegisterPage} />
        ) : (
          <div>
            <Title>{title}</Title>
            <Step>
              <Number $validation={true}>1</Number>
              <Bar $validation={isValidated} />
              <Number $validation={registerPage === 2}>2</Number>
            </Step>
            {registerPage === 2 ? (
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
                        <Input
                          $check={emailCheck}
                          placeholder="이메일을 입력해 주세요"
                          value={email}
                          onChange={onChangeEmail}
                          type="text"
                        />
                        <SmallBtn
                          onClick={() => checkEmailMutation.mutate(email)}
                        >
                          인증메일 전송
                        </SmallBtn>
                      </div>
                      <Check verifyCheck={emailCheck}>{checkingEmail}</Check>
                    </div>
                    <div>
                      <div>
                        <Input
                          $check={codeCheck}
                          placeholder="인증번호를 입력해 주세요"
                          value={code}
                          onChange={onChangeCode}
                          type="text"
                        />
                        <SmallBtn
                          onClick={() => checkCodeMutation.mutate(code)}
                        >
                          인증번호 확인
                        </SmallBtn>
                      </div>
                      <Check verifyCheck={codeCheck}>{checkingCode}</Check>
                    </div>
                  </InputBox>
                  <Retry>
                    <Text $fontSize="14px">이메일이 오지 않았나요?</Text>
                    <Link
                      style={{ textDecoration: 'none' }}
                      onClick={() => checkEmailMutation.mutate(email)}
                    >
                      <Text $fontSize="14px" color="#44A5FF">
                        인증메일 재전송
                      </Text>
                    </Link>
                  </Retry>
                </EmailBox>
                <div style={{ height: '214px' }}>
                  <div>
                    <LargeBtn
                      onClick={onClickNextStep}
                      $validation={isValidated}
                    >
                      다음
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

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
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

const Input = styled.input<{ $check: string }>`
  box-sizing: border-box;
  width: 284px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-color: ${({ $check }) =>
    $check === 'rejected'
      ? '#FF3263'
      : $check === 'confirmed'
      ? '#0BD961'
      : '#D9D9D9'};
  background: none;
  padding: 0 15px;
  &::placeholder {
    color: ${({ theme }) => theme.color.sub2};
    font-size: 14px;
    font-weight: 700;
  }
  color: ${({ theme, $check }) => theme.color.text};
`;

const SmallBtn = styled.button`
  box-sizing: border-box;
  width: 106px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.locBg};
  border: 1px solid #f97393;
  margin-left: 10px;
  color: #f97393;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-sizing: border-box;
`;

const Text = styled.div<{
  $color?: string;
  $fontSize?: string;
  $fontWeight?: string;
}>`
  color: ${({ color }) => color || '#666'};
  text-align: center;
  font-size: ${({ $fontSize }) => $fontSize || '16px'};
  font-style: normal;
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  line-height: 100%;
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

const LargeBtn = styled.button<{ $validation: boolean }>`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${({ $validation, theme }) =>
    $validation ? '#f97393' : theme.color.btnBg};
  border: none;
  margin: 0 0 61px 0;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  box-sizing: border-box;
`;
