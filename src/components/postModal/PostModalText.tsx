import React, { SetStateAction } from 'react';
import styled from 'styled-components';

const PostModalText: React.FC<{
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

  const calculateRows = (text: string) => {
    const lineBreaks = (text.match(/\n/g) || []).length + 1;
    return Math.max(lineBreaks, 1); // Minimum of 1 row
  };

  return (
    <Base>
      <TextArea
        placeholder="장소에 대해 좋았던 점을 작성해 보세요"
        value={text}
        onChange={handleChange}
        rows={calculateRows(text)}
      />
      <CharacterCount rows={calculateRows(text)}>
        {text.length}/{maxCharacters}
      </CharacterCount>
    </Base>
  );
};

export default PostModalText;

const Base = styled.div`
  margin-top: 40px;
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 80%;
  resize: none;
  border: none;
  outline: none;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

const CharacterCount = styled.div<{ rows: any }>`
  margin-top: ${(rows) =>
    (rows - 1) * 20}px; /* Adjust the margin based on the number of rows */
  color: #a3a3a3;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;
