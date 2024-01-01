import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './font.css';
const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    transition : color 200ms ease-in-out;
    transition : background-color 200ms ease-in-out;
  }
`;

export default GlobalStyle;
