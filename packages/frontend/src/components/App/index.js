import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from '../../assets/styles/global';
import defautTheme from '../../assets/styles/themes/default';

import { Container } from './styles';

import Header from '../Header';

import Routes from '../../router';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defautTheme}>
        <GlobalStyle />

        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
