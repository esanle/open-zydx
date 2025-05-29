import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'SimSun', 'STSong', serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  /* Traditional Chinese styles */
  .chinese-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }

  .text-center {
    text-align: center;
  }

  /* Colors for the five elements (Wuxing) */
  .element-wood {
    color: #4CAF50; /* Green for Wood */
  }
  
  .element-fire {
    color: #F44336; /* Red for Fire */
  }
  
  .element-earth {
    color: #FFC107; /* Yellow for Earth */
  }
  
  .element-metal {
    color: #9E9E9E; /* Grey for Metal */
  }
  
  .element-water {
    color: #2196F3; /* Blue for Water */
  }
`;

export default GlobalStyle; 