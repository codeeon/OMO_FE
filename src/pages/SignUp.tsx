import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../axios/auth';
import useInput from '../hooks/useInput';
import Check from '../components/auth/signup/Check';
import Register from './Register';

// interface UserData {
//   nickname: string;
//   email: string;
//   password: string;
// }

// interface SignupData extends UserData {
//   confirmedPassword: string;
// }

// interface UserEmail {
// }

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail, onChangeEmail] = useInput();
  const [code, setCode, onChangeCode] = useInput();

  const [emailCheck, setEmailCheck] = useState<string>('');
  const [codeCheck, setCodeCheck] = useState<string>('');

  const [confirmedEmail, setConfirmedEmail] = useState<string>('');
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [registerPage, setRegisterPage] = useState<boolean>(true);

  const title = registerPage ? '회원가입' : '이메일 인증';
  const checkingEmail =
    emailCheck === 'rejected'
      ? '올바른 이메일이 아니거나, 이미 가입한 이메일입니다.'
      : emailCheck === 'confirmed'
      ? '전송된 메일의 인증번호를 입력해주세요.'
      : '';
  const checkingCode =
    codeCheck === 'rejected'
      ? '인증번호를 다시 확인해주세요.'
      : codeCheck === 'confirmed'
      ? '전송된 메일의 인증번호를 입력해주세요.'
      : '';

  const checkEmailMutation = useMutation(
    async (email: string): Promise<void> => {
      console.log(email);
      const checkEmailResponse = await auth.post('/verify-email', { email });
      console.log('이메일 체크 응답 -> ', checkEmailResponse);
    },
    {
      onSuccess: () => {
        setEmailCheck('confirmed');
      },
      onError: () => {
        setEmailCheck('rejected');
      },
    },
  );

  const checkCodeMutation = useMutation(
    async (code: string): Promise<void> => {
      console.log(code);
      const checkCodeResponse = await auth.post('/verify-authentication-code', {
        authenticationCode: code,
        email,
      });
      console.log('코드 체크 응답 -> ', checkCodeResponse);
    },
    {
      onSuccess: () => {
        setCodeCheck('confirmed');
        setConfirmedEmail(email);
        setIsValidated(true);
      },
      onError: () => {
        setCodeCheck('rejected');
      },
    },
  );

  const onClickNextStep = () => {
    isValidated
      ? setRegisterPage(true)
      : emailCheck === 'confirmed'
      ? setCodeCheck('rejected')
      : setEmailCheck('rejected');
  };

  return (
    <Base>
      <RegisterBox>
        <Title>{title}</Title>
        <Step>
          <Number validation={true}>1</Number>
          <Bar validation={isValidated} />
          <Number validation={registerPage}>2</Number>
        </Step>
        {registerPage ? (
          <Register confirmedEmail={confirmedEmail} />
        ) : (
          <>
            <EmailBox>
              <InputBox>
                <div>
                  <div>
                    <Input
                      check={emailCheck}
                      placeholder="이메일을 입력해 주세요"
                      value={email}
                      onChange={onChangeEmail}
                      type="text"
                    />
                    <SmallBtn onClick={() => checkEmailMutation.mutate(email)}>
                      인증메일 전송
                    </SmallBtn>
                  </div>
                  <Check verifyCheck={emailCheck}>{checkingEmail}</Check>
                </div>
                <div>
                  <div>
                    <Input
                      check={codeCheck}
                      placeholder="인증번호를 입력해 주세요"
                      value={code}
                      onChange={onChangeCode}
                      type="text"
                    />
                    <SmallBtn onClick={() => checkCodeMutation.mutate(code)}>
                      인증번호 확인
                    </SmallBtn>
                  </div>
                  <Check verifyCheck={codeCheck}>{checkingCode}</Check>
                </div>
              </InputBox>
              <Retry>
                <Text fontSize="14px">이메일이 오지 않았나요?</Text>
                <Link
                  style={{ textDecoration: 'none' }}
                  onClick={() => checkEmailMutation.mutate(email)}
                >
                  <Text fontSize="14px" color="#44A5FF">
                    인증메일 재전송
                  </Text>
                </Link>
              </Retry>
            </EmailBox>
            <div style={{ height: '214px' }}>
              <div>
                <LargeBtn onClick={onClickNextStep} validation={isValidated}>
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
          </>
        )}
      </RegisterBox>
    </Base>
  );
};

export default SignUp;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 77vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterBox = styled.div`
  box-sizing: border-box;
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
  margin: 83px 0 25px 0;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const Number = styled.div`
  width: 20px;
  height: 17px;
  border-radius: 100%;
  flex-shrink: 0;
  background-color: ${({ validation }) =>
    validation ? 'var(--primary, #f97393)' : '#D9D9D9'};
  color: ${({ validation }) =>
    validation ? 'var(--dark-1_txt, #FFF)' : 'var(--light-4_sub2, #808080)'};
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3px;
`;

const Bar = styled.div`
  width: 26px;
  height: 2px;
  flex-shrink: 0;
  background: ${({ validation }) =>
    validation ? 'var(--primary, #f97393)' : '#D9D9D9'};
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

const Input = styled.input`
  box-sizing: border-box;
  width: 284px;
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
`;

const SmallBtn = styled.button`
  box-sizing: border-box;
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

const Text = styled.div`
  color: ${({ color }) => color || '#666'};
  text-align: center;
  font-family: Wanted Sans;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
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
