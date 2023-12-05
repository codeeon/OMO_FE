import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    transition: all 200ms ease-in-out;
  }
`;

export default GlobalStyle;
