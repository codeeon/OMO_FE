import React, { SetStateAction } from 'react';
import styled from 'styled-components';

const PostTextArea: React.FC<{
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
}> = ({ text, setText }) => {
  const maxCharacters = 200;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxCharacters) {
      setText(newText);
    }
  };

  return (
    <Base>
      <TextArea
        placeholder="글을 입력하세요"
        value={text}
        onChange={handleChange}
      />
      <CharacterCount>
        {text.length}/{maxCharacters}
      </CharacterCount>
    </Base>
  );
};

export default PostTextArea;

const Base = styled.div`
  margin-top: 40px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;

  border: none;
  outline: none;

  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.bg};
  font-size: 16px;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;

  &::placeholder {
    color: #a5a5a5;
    font-size: 16px;
    font-weight: 500;
  }
`;

const CharacterCount = styled.div`
  margin-bottom: 30px;

  color: #a3a3a3;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;
