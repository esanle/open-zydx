import React from 'react';
import styled from 'styled-components';
import BaziCalculator from './components/BaziCalculator';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'SimSun', 'STSong', serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #8B0000;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  color: #8B0000;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>八字排盘系统</Title>
          <Subtitle>传统命理 · 四柱八字</Subtitle>
        </Header>
        <BaziCalculator />
      </AppContainer>
    </>
  );
}

export default App;
