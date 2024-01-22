import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}  
  body{
    word-break: keep-all;
  }
`;

export default GlobalStyle;
