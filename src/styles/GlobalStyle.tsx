import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  #root {
    font-family: 'Wanted Sans Variable';
  }
  * {
    transition : color 200ms ease-in-out;
    transition : background-color 200ms ease-in-out;

  }
`;

export default GlobalStyle;
