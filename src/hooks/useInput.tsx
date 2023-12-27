import React, { ChangeEvent, useState } from 'react';

const useInput = (args) => {
  const [value, setValue] = useState<string>(args);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, setValue, onChangeHandler];
};

export default useInput;
