import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import BaziCalculator from './components/BaziCalculator';
import GlobalStyle from './styles/GlobalStyle';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const AppLayout = styled(Layout)`
  min-height: 100vh;
`;

const HeaderContent = styled(Header)`
  background-color: #8B0000;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  font-family: 'SimSun', 'STSong', serif;
`;

const MainContent = styled(Content)`
  padding: 20px;
  background-color: #f5f5f5;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled(Footer)`
  text-align: center;
  background-color: #f0f0f0;
  border-top: 1px solid #ddd;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <HeaderContent>
          <Logo>周易大学堂 · 八字排盘系统</Logo>
        </HeaderContent>
        <MainContent>
          <ContentWrapper>
            <BaziCalculator />
          </ContentWrapper>
        </MainContent>
        <FooterContent>
          周易大学堂 · 八字排盘系统 &copy; {new Date().getFullYear()}
        </FooterContent>
      </AppLayout>
    </>
  );
};

export default App;
