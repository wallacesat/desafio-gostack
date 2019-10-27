import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box
}

*:focus {
  outline: 0;
}

.Toastify__toast--default {
  background: rgba(0, 0, 0, 0.2) !important;
}

.Toastify__toast--error {
  background: rgba(255, 20, 70, 0.5) !important;
}

.Toastify__toast--success {
  background: rgba(40, 255, 40, 0.7) !important;
}

.Toastify__progress-bar--default {
  background: linear-gradient(to right, #402845, #ff2d55) !important;
}

html, body, #root {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}


body {
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 14px 'Roboto', 'sans-serif';
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
}
`;
