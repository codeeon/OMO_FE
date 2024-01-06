/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Check from '../components/auth/signup/Check';
import api from '../axios/api';
import useGetMyDataQuery from '../hooks/reactQuery/mypage/useGetMyDataQuery';
import authApi from '../axios/authApi';
import ProfileImage from '../components/auth/mypage/edit/ProfileImage';
import useUpdateMyImageMutation from '../hooks/reactQuery/mypage/useUpdateMyImageMutation';
import WithdrawModal from '../components/auth/mypage/edit/WithdrawModal';
import SubModal from '../components/Modal/SubModal';

interface UserEmail {
  email: string;
}

interface SignUpData {
  nickname?: string;
  password: string;
  confirmedPassword: string;
}

interface UserData extends UserEmail, SignUpData {}

const ProfileEdit = () => {
  const { register, handleSubmit, setError, trigger } = useForm<SignUpData>({
    mode: 'onChange',
  });

  const { myImageMutate } = useUpdateMyImageMutation();

  const navigate = useNavigate();

  const { data: myData, isError: userError } = useGetMyDataQuery();

  const [imageURL, setImageUrl] = useState([myData?.data.imgUrl]);
  const [files, setFiles] = useState<File[]>([]);

  const [nickname, setNickname] = useState(myData?.data.nickname);

  const [nicknameCheck, setNicknameCheck] = useState<string>('');
  const [confirmedNickname, setConfirmedNickname] = useState<string>('');

  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [confirmedPasswordCheck, setConfirmedPasswordCheck] =
    useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이것도 회원가입이랑 겹치는데 간결하게 만들어서 재사용 가능할까?
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

  // 마이페이지와 겹침 - 훅으로 만들기?
  // 의존성 배열에 뭘 넣어야, 리프레쉬 토큰 만료가 됐을 때 해결할 수 있을까?
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    (userError || !userId) &&
      (alert('로그인 후 이용해주세요.'), navigate('/login'));
  }, []);

  const onValid = async ({ password, confirmedPassword }: SignUpData) => {
    if (
      password.length > 5 &&
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password)
    ) {
      setPasswordCheck('confirmed');
    } else {
      setPasswordCheck('rejected');
      setError('password');
    }

    if (password.length > 0 && password === confirmedPassword) {
      setConfirmedPasswordCheck('confirmed');
    } else {
      setConfirmedPasswordCheck('rejected');
      setError('confirmedPassword');
    }

    if (!password.length) {
      setPasswordCheck('');
    }

    if (!confirmedPassword.length) {
      setConfirmedPasswordCheck('');
    }

    if (nickname === '') {
      setNicknameCheck('');
    }

    await trigger(['password', 'confirmedPassword']);
  };

  // 이것도 분리 가능할 듯 - Register도 마찬가지
  const onValidNickname = (e) => {
    setNickname(e.target.value);
    nicknameCheck === 'confirmed' && setNicknameCheck('retry');
  };

  // 닉네임이 비었을 경우 - 좀 쓸 데 없이 렌더링 되려나 - 최적화 찾아보기
  useEffect(() => {
    nickname === '' && setNicknameCheck('');
  }, [nickname]);

  // rejected일 때, 모두가 변하지 않았을 때, 회색인 게 나은 듯 -> 수정 예정
  const allValidated =
    (nicknameCheck === 'confirmed' &&
      passwordCheck === 'confirmed' &&
      confirmedPasswordCheck === 'confirmed' &&
      nickname) ||
    (nicknameCheck === 'confirmed' &&
      passwordCheck === '' &&
      confirmedPasswordCheck === '' &&
      nickname) ||
    (nickname === '' &&
      passwordCheck === 'confirmed' &&
      confirmedPasswordCheck === 'confirmed') ||
    files.length !== 0;

  // 회원가입 페이지와 동일, hook으로 만들기
  const checkNicknameMutation = useMutation(
    async (nickname: string): Promise<void> => {
      const checkNicknameResponse = await api.post('/auth/check-nickname', {
        nickname,
      });
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

  const updateProfileMutation = useMutation<void, Error, UserData>(
    async (data: UserData): Promise<void> => {
      const response = await authApi.patch(
        `/api/users/self/profile/edit`,
        data,
      );
    },
    {
      onSuccess: () => {
        navigate('/mypage');
      },
    },
  );

  // 프로필 사진 수정한 것도 넣어야 함!!!
  // nickname이 비어 있으면 myData?.data.nickname, confirmedNickname과 현재 nickname이 같으면 POST, 다르면 alert('닉네임 중복 확인 버튼을 눌러 주세요')
  const onClickSubmit = async (data: SignUpData): void => {
    await onValid(data);

    if (allValidated) {
      if (nickname === '') {
        updateProfileMutation.mutate(data);
      } else if (confirmedNickname !== nickname) {
        files.length === 0 && alert('닉네임 중복 체크를 다시 확인해주세요.');
      } else if (data.password === '') {
        updateProfileMutation.mutate({ nickname: confirmedNickname });
      } else {
        data.nickname = confirmedNickname;
        updateProfileMutation.mutate(data);
      }
      if (files.length > 0) {
        const profileImg = { imgUrl: files };
        myImageMutate(profileImg);
      }
    } else {
      alert('변경할 내용을 다시 확인해주세요!');
    }
  };

  return (
    <Base>
      <Title>내 정보 수정</Title>
      <ProfileBox>
        <Profile>
          <Text $fontSize="24px">프로필 수정</Text>
          <ImgContatiner>
            <ProfileImage
              imageURL={imageURL}
              setImageUrl={setImageUrl}
              setFiles={setFiles}
              files={files}
            ></ProfileImage>
          </ImgContatiner>
          <InputContainer>
            <InputWrapper>
              <Text style={{ marginBottom: '6px' }}>닉네임</Text>
              <div>
                <Input
                  $check={nicknameCheck}
                  $width="284px"
                  placeholder={`${myData?.data.nickname}  (2~15자)`}
                  type="text"
                  value={nickname}
                  onChange={onValidNickname}
                />
                <SmallBtn
                  onClick={() =>
                    nickname === ''
                      ? setNicknameCheck('')
                      : checkNicknameMutation.mutate(nickname)
                  }
                  type="button"
                >
                  중복체크
                </SmallBtn>
              </div>
              <Check verifyCheck={nicknameCheck}>{checkingNickname}</Check>
            </InputWrapper>
            <InputWrapper style={{ marginTop: '30px' }}>
              <Text style={{ marginBottom: '16px' }}>이메일</Text>
              <Text $fontSize="20px">{myData?.data.email}</Text>
            </InputWrapper>
          </InputContainer>
          <Text style={{ margin: '60px 0 20px 0' }} $fontSize="24px">
            비밀번호 재설정
          </Text>
          <form onChange={handleSubmit(onValid)}>
            <InputContainer>
              <InputWrapper>
                <Text style={{ marginBottom: '6px' }}>비밀번호</Text>
                <Input
                  $check={passwordCheck}
                  placeholder="비밀번호를 입력해 주세요.  (6자 이상, 영문, 숫자 필수)"
                  type="password"
                  {...register('password')}
                />
                <Check verifyCheck={passwordCheck}>{checkingPassword}</Check>
              </InputWrapper>
              <InputWrapper style={{ marginTop: '30px' }}>
                <Text style={{ marginBottom: '6px' }}>비밀번호 확인</Text>
                <Input
                  $check={confirmedPasswordCheck}
                  placeholder="비밀번호를 한 번 더 입력해 주세요."
                  type="password"
                  {...register('confirmedPassword')}
                />
                <Check verifyCheck={confirmedPasswordCheck}>
                  {checkingConfirmedPassword}
                </Check>
              </InputWrapper>
            </InputContainer>
          </form>
          <Submit>
            <Btn onClick={() => navigate('/mypage')}>
              <Text $color="#FFF" $fontSize="14px">
                취소
              </Text>
            </Btn>
            <Btn $check={allValidated} onClick={handleSubmit(onClickSubmit)}>
              <Text $color="#FFF" $fontSize="14px">
                수정하기
              </Text>
            </Btn>
          </Submit>
        </Profile>
      </ProfileBox>
      <Withdraw onClick={() => setIsModalOpen(true)}>
        <Text $color="#808080">회원탈퇴를 원하시나요?</Text>
      </Withdraw>
      <SubModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        width="335px"
        height="207px"
      >
        <WithdrawModal setIsModalOpen={setIsModalOpen} />
      </SubModal>
    </Base>
  );
};

export default ProfileEdit;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: ${({ theme }) => theme.color.bg};
  min-height: calc(100vh - 60px);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin: 74px 0 28px 0;
  background-color: ${({ theme }) => theme.color.bg};
`;

const ProfileBox = styled.div`
  box-sizing: border-box;
  width: 620px;
  height: 862px;
  flex-shrink: 0;
  border-radius: 16px;
  border: ${({ theme }) => '1px solid ' + theme.color.border};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.cardBg};
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 400px;
  height: 762px;
`;

const Text = styled.div<{ $color: string; $fontSize: string }>`
  color: ${({ $color, theme }) => $color || theme.color.text};
  font-size: ${({ $fontSize }) => $fontSize || '16px'};
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
`;

const ImgContatiner = styled.div`
  margin: 20px 0;
  gap: 24px;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input<{ $width: string; check: string }>`
  width: ${({ $width }) => $width || '400px'};
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  border-color: ${({ $check }) =>
    $check === 'rejected'
      ? 'var(--error_accent, #FF3263)'
      : $check === 'confirmed'
      ? '#0BD961'
      : '#D9D9D9'};
  background: none;
  padding: 0 15px;
  color: ${({ theme }) => theme.color.text};
  font-weight: 700;
  &::placeholder {
    color: #a5a5a5;

    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
  }
  box-sizing: border-box;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.locBg};
`;

const Submit = styled.div`
  width: 100%;
  margin-top: 28px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Btn = styled.button<{ $check: string; color: string }>`
  width: 77px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: none;
  background: ${({ $check, $color, theme }) =>
    $color ? $color : $check ? theme.color.link : theme.color.btnBg};
  cursor: pointer;
`;

const Withdraw = styled.div`
  margin: 50px 0 100px 0;
  cursor: pointer;
`;
