import { useState, ChangeEvent, SetStateAction } from 'react';

interface UseInputProps {
  initialState?: string;
}

interface UseInputReturn {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  changeValueHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  clearValueHandler: () => void;
}

const useInput = ({
  initialState = '',
}: UseInputProps = {}): UseInputReturn => {
  const [value, setValue] = useState<string>(initialState);

  const changeValueHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setValue(e.target.value);
  };

  const clearValueHandler = (): void => {
    setValue('');
  };

  return { value, setValue, changeValueHandler, clearValueHandler };
};

export default useInput;
