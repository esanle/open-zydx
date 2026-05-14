import React from 'react';
import styled from 'styled-components';
import { STEMS_ELEMENTS, BRANCHES_ELEMENTS } from '../utils/baziUtils';

interface PillarDetails {
  name: string;
  stem: string;
  branch: string;
  stemElement: string;
  branchElement: string;
  hiddenStems: string[];
  tenGods: string[];
  yinYang: {
    stem: string;
    branch: string;
  };
  naYin?: string;
}

interface DetailedPillarProps {
  pillars: {
    year: PillarDetails;
    month: PillarDetails;
    day: PillarDetails;
    time: PillarDetails;
  };
}

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
  margin-bottom: 20px;
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: 14px;
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

const ElementSpan = styled.span<{ element: string; bold?: boolean }>`
  color: ${props => getElementColor(props.element)};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

const HiddenStemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HiddenStemRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ExplanationBox = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  
  p {
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

function getElementColor(element: string): string {
  switch (element) {
    case '木': return '#4CAF50'; // Green for Wood
    case '火': return '#F44336'; // Red for Fire
    case '土': return '#FFC107'; // Yellow for Earth
    case '金': return '#9E9E9E'; // Grey for Metal
    case '水': return '#2196F3'; // Blue for Water
    default: return '#333';
  }
}

const DetailedPillar: React.FC<DetailedPillarProps> = ({ pillars }) => {
  return (
    <Container>
      <Title>八字详解</Title>
      
      <Table>
        <thead>
          <tr>
            <th>柱位</th>
            <th>天干</th>
            <th>地支</th>
            <th>干五行</th>
            <th>支五行</th>
            <th>藏干</th>
            <th>十神</th>
            <th>干阴阳</th>
            <th>支阴阳</th>
            {pillars.year.naYin && <th>纳音</th>}
          </tr>
        </thead>
        <tbody>
          {Object.values(pillars).map((pillar, index) => (
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
                <HiddenStemsContainer>
                  {pillar.hiddenStems.map((stem, i) => (
                    <HiddenStemRow key={i}>
                      <ElementSpan element={STEMS_ELEMENTS[stem]}>
                        {stem}
                      </ElementSpan>
                    </HiddenStemRow>
                  ))}
                </HiddenStemsContainer>
              </td>
              <td>
                <HiddenStemsContainer>
                  {pillar.name !== '日柱' && (
                    <HiddenStemRow>
                      {pillar.tenGods[0]}
                    </HiddenStemRow>
                  )}
                  {pillar.tenGods.slice(1).map((god, i) => (
                    <HiddenStemRow key={i}>
                      {god}
                    </HiddenStemRow>
                  ))}
                </HiddenStemsContainer>
              </td>
              <td>{pillar.yinYang.stem}</td>
              <td>{pillar.yinYang.branch}</td>
              {pillar.naYin && <td>{pillar.naYin}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
      
      <ExplanationBox>
        <p><strong>八字详解说明：</strong></p>
        <p>1. <strong>干支</strong>：天干与地支组合，构成年、月、日、时四柱；</p>
        <p>2. <strong>五行</strong>：天干地支各有对应五行，影响命局的五行力量；</p>
        <p>3. <strong>藏干</strong>：地支中隐藏的天干，补充了命局中的五行力量；</p>
        <p>4. <strong>十神</strong>：天干以日主为中心的十种关系，如比肩、劫财、伤官等；</p>
        <p>5. <strong>阴阳</strong>：天干地支的阴阳属性，影响命局的平衡；</p>
        <p>6. <strong>纳音</strong>：干支组合的特殊五行属性，对命局有细微影响。</p>
      </ExplanationBox>
    </Container>
  );
};

export default DetailedPillar; 