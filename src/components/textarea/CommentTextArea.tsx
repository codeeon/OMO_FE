import React from 'react';
import styled from 'styled-components';

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  isTextareaFocus: boolean;
}

const CommentTextArea: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  isTextareaFocus,
}) => {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      $isTextareaFocus={isTextareaFocus}
    ></Textarea>
  );
};

export default CommentTextArea;

const Textarea = styled.textarea<{ $isTextareaFocus: boolean }>`
  width: calc(100% - 40px);
  height: 60px;
  resize: none;
  border-radius: 8px;
  border: ${({ $isTextareaFocus, theme }) =>
    $isTextareaFocus
      ? `1px solid ${theme.color.link}`
      : `1px solid ${theme.color.cardBorder}`};
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 10px;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: #808080;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    font-family: 'Wanted Sans';
  }
  font-family: 'Wanted Sans';
  outline: none;
  transition: border 200ms ease;
`;
