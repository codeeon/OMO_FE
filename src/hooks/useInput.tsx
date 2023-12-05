import React, { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, setValue, onChangeHandler];
};

export default useInput;
