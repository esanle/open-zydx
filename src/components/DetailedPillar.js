import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0;
`;

const Title = styled.h3`
  color: #8B0000;
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
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
`;

const ElementSpan = styled.span`
  color: ${props => getElementColor(props.element)};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

function getElementColor(element) {
  switch (element) {
    case '木': return '#4CAF50'; // Green for Wood
    case '火': return '#F44336'; // Red for Fire
    case '土': return '#FFC107'; // Yellow for Earth
    case '金': return '#9E9E9E'; // Grey for Metal
    case '水': return '#2196F3'; // Blue for Water
    default: return '#333';
  }
}

function DetailedPillar({ pillars }) {
  return (
    <Container>
      <Title>八字详解</Title>
      
      <Table>
        <thead>
          <tr>
            <th>柱位</th>
            <th>天干</th>
            <th>地支</th>
            <th>天干五行</th>
            <th>地支五行</th>
            <th>藏干</th>
            <th>纳音</th>
            <th>天干阴阳</th>
            <th>地支阴阳</th>
          </tr>
        </thead>
        <tbody>
          {pillars.map((pillar, index) => (
            <tr key={index}>
              <td>{pillar.name}</td>
              <td>
                <ElementSpan element={pillar.stemElement} bold>
                  {pillar.stem}
                </ElementSpan>
              </td>
              <td>
                <ElementSpan element={pillar.branchElement} bold>
                  {pillar.branch}
                </ElementSpan>
              </td>
              <td>
                <ElementSpan element={pillar.stemElement}>
                  {pillar.stemElement}
                </ElementSpan>
              </td>
              <td>
                <ElementSpan element={pillar.branchElement}>
                  {pillar.branchElement}
                </ElementSpan>
              </td>
              <td>
                {pillar.hiddenStems.map((stem, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && '，'}
                    {stem}
                  </React.Fragment>
                ))}
              </td>
              <td>{pillar.soundElement}</td>
              <td>{pillar.stemYinYang}</td>
              <td>{pillar.branchYinYang}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <div style={{ marginTop: '20px' }}>
        <p><strong>说明：</strong></p>
        <p>1. 八字由四柱组成，每柱包含天干和地支；</p>
        <p>2. 天干地支各有五行属性，影响命局喜忌；</p>
        <p>3. 地支藏干表示地支中隐含的天干，对命局有补充作用；</p>
        <p>4. 纳音五行是天干地支组合后的特殊五行属性；</p>
        <p>5. 阴阳属性影响八字的平衡性。</p>
      </div>
    </Container>
  );
}

export default DetailedPillar; 