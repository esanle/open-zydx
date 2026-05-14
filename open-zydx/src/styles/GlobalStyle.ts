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

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 28px;
    color: #8B0000;
  }

  h2 {
    font-size: 24px;
    color: #8B0000;
  }

  h3 {
    font-size: 20px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Traditional Chinese styles */
  .chinese-text {
    font-family: 'SimSun', 'STSong', serif;
  }

  .chinese-title {
    font-family: 'SimSun', 'STSong', serif;
    color: #8B0000;
    border-bottom: 2px solid #8B0000;
    padding-bottom: 8px;
    margin-bottom: 20px;
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

  /* Paper-like containers */
  .paper {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .paper-red {
    background-color: #FFF8F0;
    border: 2px solid #8B0000;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  /* Traditional button */
  .btn-traditional {
    background-color: #8B0000;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #6B0000;
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  /* Form styles */
  .form-group {
    margin-bottom: 15px;
  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    
    &:focus {
      border-color: #8B0000;
      outline: none;
    }
  }

  /* Table styles */
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: center;
    }
    
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    tr:hover {
      background-color: #f5f5f5;
    }
  }

  /* Grid layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;

export default GlobalStyle; 