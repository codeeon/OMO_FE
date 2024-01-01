import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  #root {
    font-family: 'Wanted Sans';
  }
  #modal-root {
    font-family: 'Wanted Sans';
  }
  input {
    font-family: 'Wanted Sans';
  }
  input::placeholder {
    font-family: 'Wanted Sans';
  }

  * {
    transition : color 200ms ease-in-out;
    transition : background-color 200ms ease-in-out;
  }
`;

export default GlobalStyle;
