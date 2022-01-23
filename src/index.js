import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react'
import './index.css';
import App from './App';

const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#B794F4",
      500: "#B794F4", // you need this
    }
  }
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);