import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import wantedSansRegular from '../assets/font/WantedSansStd-Regular.woff2';

const GlobalStyle = createGlobalStyle`
  
  @font-face {
        font-family: "WantedSans";
        src: local("WantedSans"), url(${wantedSansRegular}) format('woff'); 
    }
  ${reset}
  
  #root {
    font-family: 'WantedSans';
  }
  * {
    transition : color 200ms ease-in-out;
    transition : background-color 200ms ease-in-out;

  }
`;

export default GlobalStyle;
