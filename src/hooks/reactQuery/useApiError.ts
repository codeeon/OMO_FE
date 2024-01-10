import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const useApiError = () => {
  const handleError = useCallback((error) => {
    const httpStatus = error.response.status; // axios 에러 코드
    const serviceCode = error.response.data.code; // 응답 코드
    const httpMessage = error.response.data.message; // 응답 메시지

    if (handlers[httpStatus][serviceCode]) {
      handlers[httpStatus][serviceCode]();
      return;
    }

    if (handlers[httpStatus]) {
      handlers[httpStatus].default();
      return;
    }

    handlers.default(httpMessage);
  }, []);

  return { handleError };
};

const defaultHandler = (httpMessage) => {
  toast(httpMessage);
};

const handler400 = () => {
  toast.error('데이터 형식이 맞지 않습니다.', {
    position: 'bottom-right',
    duration: 4000,
  });
};

const handler401 = () => {
  toast.error('아이디와 비밀번호를 확인해주세요', {
    position: 'bottom-right',
    duration: 4000,
  });
};

const handler403 = () => {
  toast.error('로그인 후 사용해주세요.', {
    position: 'bottom-right',
    duration: 4000,
  });
};

const handler404 = () => {
  toast.error('요청받은 리소스를 찾을 수 없습니다.', {
    position: 'bottom-right',
    duration: 4000,
  });
};

const handler500 = () => {
  toast.error('서버에서 알 수 없는 문제가 발생하였습니다.', {
    position: 'bottom-right',
    duration: 4000,
  });
};

const handlers = {
  default: defaultHandler,
  400: {
    default: handler400,
  },
  401: {
    default: handler401,
  },
  403: {
    default: handler403,
  },
  404: {
    default: handler404,
  },
  500: {
    default: handler500,
  },
};

export default useApiError;
