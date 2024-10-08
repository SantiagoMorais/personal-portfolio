import { createGlobalStyle } from "styled-components"
import { fonts } from "../utils/variables"

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        border: none;
        font-family: ${fonts.fontFamily};
        z-index: 1;
    }

    html {
        font-size: 62.5%;
        font-weight: 400;
        scroll-behavior: smooth;
    }

    body {
        font-size: ${fonts.fontSizeSmall};
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }
`