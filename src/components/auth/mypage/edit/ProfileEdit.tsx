/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Check from '../../signup/Check';
import auth from '../../../../axios/auth';
import useInput from '../../../../hooks/useInput';
import useGetUserDataQuery from '../../../../hooks/reactQuery/mypage/useGetUserDataQuery';
import authApi from '../../../../axios/authApi';
import authAuth from '../../../../axios/authAuth';
// import { onImageChange } from '../../../../function/uploadImage';
import ProfileImage from './ProfileImage';
import useUpdateMyImageMutation from '../../../../hooks/reactQuery/mypage/useUpdateMyImageMutation';

interface UserEmail {
  email: string;
}

interface SignUpData {
  nickname?: string;
  password: string;
  confirmedPassword: string;
}

interface UserData extends UserEmail, SignUpData {}

// interface File extends Blob {
//   readonly lastModified: number;
//   readonly name: string;
//   readonly webkitRelativePath: string;
// }

// declare var File: {
//   prototype: File;
//   new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
// };

const ProfileEdit = () => {
  const { register, handleSubmit, setError, trigger } = useForm<SignUpData>({
    mode: 'onChange',
  });

  // const { mutate: imgMutate } = useMutation(onImageChange);
  const { myImageMutate } = useUpdateMyImageMutation();

  const navigate = useNavigate();

  const { data: userData, isError: userError } = useGetUserDataQuery();

  const [imageURL, setImageUrl] = useState([userData?.data.imgUrl]);
  // const image = imageURL.slice(-1);
  // const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const { value: nickname, changeValueHandler: onChangeNickname } = useInput(
    userData?.data.nickname,
  );
  const [nicknameCheck, setNicknameCheck] = useState<string>('');
  const [confirmedNickname, setConfirmedNickname] = useState<string>('');

  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [confirmedPasswordCheck, setConfirmedPasswordCheck] =
    useState<string>('');

  const [isWithdraw, setIsWithdraw] = useState(false);

  // 이것도 회원가입이랑 겹치는데 간결하게 만들어서 재사용 가능할까?
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

  // 마이페이지와 겹침 - 훅으로 만들기
  // 의존성 배열에 뭘 넣어야, 리프레쉬 토큰 만료가 됐을 때 해결할 수 있을까?
  useEffect(() => {
    userError
      ? (alert('다시 로그인 후 이용해주세요.'),
        sessionStorage.removeItem('userId'),
        sessionStorage.removeItem('accessToken'),
        sessionStorage.removeItem('refreshToken'),
        navigate('/login'))
      : null;
    // : console.log(sessionStorage.getItem('userId'));
  }, []);

  // useEffect(() => {
  //   console.log(imageUrl);
  // }, [imageUrl]);

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

    // if (userData?.data.imageUrl !== image) {
    //   setIsImageChanged(true);
    // }
    await trigger(['password', 'confirmedPassword']);
  };

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
    files.length > 0;

  // 회원가입 페이지와 동일, hook으로 만들기
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

  const updateProfileMutation = useMutation<void, Error, UserData>(
    async (data: UserData): Promise<void> => {
      // console.log(data);
      const response = await authApi.patch(`/users/self/profile/edit`, data);
      // console.log(response);
    },
    {
      onSuccess: () => {
        // alert('프로필을 변경하였습니다.');
        navigate('/mypage');
      },
      onError: (error) => {
        // console.log(error);
        // alert('프로필 변경에 실패하였습니다.');
      },
    },
  );

  const deleteUserMutation = useMutation<void, Error>(
    async (): Promise<void> => {
      const response = await authAuth.delete(`/withdraw`);
      // console.log(response);
    },
    {
      onSuccess: () => {
        alert('회원 탈퇴를 완료하였습니다.');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        navigate('/');
      },
      onError: (error) => {
        alert('회원 탈퇴에 실패하였습니다.');
      },
    },
  );

  // 프로필 사진 수정한 것도 넣어야 함!!!
  // nickname이 비어 있으면 userData?.data.nickname, confirmedNickname과 현재 nickname이 같으면 POST, 다르면 alert('닉네임 중복 확인 버튼을 눌러 주세요')
  const onClickSubmit = async (data: SignUpData): void => {
    await onValid(data);
    // 사진이 바뀌었을 때, 바뀐 사진을 data.imgUrl에 첨부한다. if()
    // if (isImageChanged) {
    // if (!isImageChanged) {
    //   const profileImg = { imgUrl: files };
    //   console.log('profileImg -> ', profileImg);
    //   myImageMutate(profileImg);
    // }

    if (allValidated) {
      // if (
      //   nickname.length === 0 &&
      //   confirmedNickname !== nickname &&
      //   data.password.length === 0
      // ) {
      //   alert('프로필을 변경하였습니다.');
      //   navigate('/mypage');
      // }
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
        // console.log(profileImg);
      }
    } else {
      alert('변경할 내용을 다시 확인해주세요!');
    }
    // if (files.length > 0) {
    //   const profileImg = { imgUrl: files };
    //   myImageMutate(profileImg);
    //   // console.log(profileImg);
    // }
    // if (allValidated) {
    //   if (nickname === '') {
    //     updateProfileMutation.mutate(data);
    //   } else if (confirmedNickname !== nickname) {
    //     alert('닉네임 중복 체크를 다시 확인해주세요.');
    //   } else if (data.password === '') {
    //     updateProfileMutation.mutate({ nickname: confirmedNickname });
    //   } else {
    //     data.nickname = confirmedNickname;
    //     updateProfileMutation.mutate(data);
    //   }
    // } else {
    //   alert('변경할 내용을 다시 확인해주세요!');
    // }
  };

  const onClickWithdraw = () => {
    deleteUserMutation.mutate();
  };

  return (
    <Base>
      <Title>내 정보 수정</Title>
      <ProfileBox>
        <Profile>
          <Text fontSize="24px">프로필 수정</Text>
          <ImgContatiner>
            {/* <Img
              onClick={() =>
                Image({
                  imageURL: imageUrl,
                  setImageUrl,
                  setFiles,
                  files,
                })
              }
              style={{ marginBottom: '24px' }}
              src={image}
              alt=""
            /> */}
            <ProfileImage
              // style={{ marginBottom: '24px' }}
              imageURL={imageURL}
              setImageUrl={setImageUrl}
              setFiles={setFiles}
              files={files}
            />
            <Text
              style={{ marginTop: '24px' }}
              fontSize="14px"
              color="var(--link, #44A5FF)"
            >
              프로필 사진
            </Text>
          </ImgContatiner>
          <InputContainer>
            <InputWrapper>
              <Text style={{ marginBottom: '6px' }}>닉네임</Text>
              <div>
                <Input
                  check={nicknameCheck}
                  width="284px"
                  placeholder={userData?.data.nickname}
                  type="text"
                  value={nickname}
                  onChange={onChangeNickname}
                />
                {/* 나중에 버튼을 제거하고 onChange 디바운싱 POST로 교체 */}
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
              <Text style={{ marginBottom: '6px' }}>이메일</Text>
              <Input
                placeholder={userData?.data.email}
                value=""
                // placeholder={userData?.data.email + '   (수정 불가)'}
                // value={userData?.data.email + '   (수정 불가)'}
                // value={userData?.data.email}
              />
            </InputWrapper>
          </InputContainer>
          <Text style={{ margin: '60px 0 20px 0' }} fontSize="24px">
            비밀번호 재설정
          </Text>
          <form onChange={handleSubmit(onValid)}>
            <InputContainer>
              <InputWrapper>
                <Text style={{ marginBottom: '6px' }}>비밀번호</Text>
                <Input
                  check={passwordCheck}
                  placeholder="비밀번호를 입력해 주세요."
                  type="password"
                  {...register('password')}
                />
                <Check verifyCheck={passwordCheck}>{checkingPassword}</Check>
              </InputWrapper>
              <InputWrapper style={{ marginTop: '30px' }}>
                <Text style={{ marginBottom: '6px' }}>비밀번호 확인</Text>
                <Input
                  check={confirmedPasswordCheck}
                  placeholder="비밀번호를 다시 입력해 주세요."
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
              <Text color="#FFF" fontSize="14px">
                취소
              </Text>
            </Btn>
            <Btn check={allValidated} onClick={handleSubmit(onClickSubmit)}>
              <Text color="#FFF" fontSize="14px">
                수정하기
              </Text>
            </Btn>
          </Submit>
        </Profile>
      </ProfileBox>
      <Withdraw onClick={() => setIsWithdraw(!isWithdraw)}>
        <Text color="var(--light-4_sub2, #808080)">회원탈퇴를 원하시나요?</Text>
      </Withdraw>
      {isWithdraw && (
        <SelectQuestion>
          <Text color="tomato" fontSize="24px">
            정말로 탈퇴하시겠습니까?
          </Text>
          <Selection>
            <Btn onClick={() => setIsWithdraw(!isWithdraw)}>
              <Text color="#FFF" fontSize="14px">
                취소
              </Text>
            </Btn>
            <Btn onClick={onClickWithdraw} color="tomato">
              <Text color="#FFF" fontSize="14px">
                탈퇴하기
              </Text>
            </Btn>
          </Selection>
        </SelectQuestion>
      )}
    </Base>
  );
};

export default ProfileEdit;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  /* height: 77vh; */
  height: 100%;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: var(--light-1_txt, #111);
  text-align: center;
  font-family: Wanted Sans;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin: 46px 0 28px 0;
`;

const ProfileBox = styled.div`
  box-sizing: border-box;
  width: 620px;
  height: 862px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 400px;
  height: 762px;
`;

const Text = styled.div<{ fontSize: string }>`
  color: ${({ color }) => color || 'var(--light-1_txt, #111)'};
  font-family: Wanted Sans;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
`;

const ImgContatiner = styled.div`
  margin: 20px 0;
  gap: 24px;
`;

// const Img = styled.img`
//   width: 88px;
//   height: 88px;
//   border-radius: 100%;
//   background: url(<path-to-image>), lightgray 50% / cover no-repeat;
//   flex-shrink: 0;
//   cursor: pointer;
// `;

const InputContainer = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const Submit = styled.div`
  width: 100%;
  margin-top: 28px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Btn = styled.button`
  width: 77px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: none;
  background: ${({ check, color }) =>
    color ? color : check ? '#44A5FF' : 'var(--light-5_btn_bg, #b1b1b1)'};
  cursor: pointer;
`;

const Withdraw = styled.div`
  margin: 50px 0 20px 0;
  cursor: pointer;
`;

const SelectQuestion = styled.div`
  margin: 10px 0 40px 0;
  padding: 20px 30px;
  border: 2px solid tomato;
  border-radius: 8px;
`;

const Selection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 15px 0 0 0;
`;
