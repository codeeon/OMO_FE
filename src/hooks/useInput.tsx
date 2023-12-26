import React, { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClearHandler = () => {
    setValue('');
  };

  return [value, onClearHandler, onChangeHandler];
};

export default useInput;
