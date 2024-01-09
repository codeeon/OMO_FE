import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

// 이거 추가안하면 expect, toBeInTheDocument 등의 jest-dom 함수들이 작동안함
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

export { customRender as render };
