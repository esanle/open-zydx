import React from 'react';
import styled from 'styled-components';
import { FIVE_ELEMENTS } from '../utils/baziUtils';

interface ElementStrength {
  element: string;
  value: number;
  status: string;
}

interface DayMaster {
  element: string;
  value: number;
  status: string;
}

interface ElementAnalysisProps {
  elementStrengths: ElementStrength[];
  dayMaster: DayMaster;
  useful: string[];
  avoid: string[];
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

const ElementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ElementCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const ElementHeader = styled.div<{ element: string }>`
  background-color: ${props => getElementColor(props.element, 1)};
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

const ElementBody = styled.div`
  padding: 15px;
  background-color: white;
`;

const ElementStat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ElementValue = styled.span<{ highlight?: boolean }>`
  font-weight: bold;
  color: ${props => props.highlight ? '#8B0000' : '#333'};
`;

const Section = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h4`
  color: #8B0000;
  margin-bottom: 15px;
  font-size: 18px;
`;

const ElementTag = styled.span<{ element: string }>`
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${props => getElementColor(props.element, 0.2)};
  color: ${props => getElementColor(props.element, 1)};
  font-weight: bold;
`;

const ElementBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const ElementBarFill = styled.div<{ value: number; element: string }>`
  height: 100%;
  width: ${props => Math.min(props.value * 15, 100)}%;
  background-color: ${props => getElementColor(props.element, 0.8)};
  border-radius: 10px;
`;

function getElementColor(element: string, opacity = 1): string {
  let color;
  switch (element) {
    case '木': color = '76, 175, 80'; break; // Green for Wood
    case '火': color = '244, 67, 54'; break; // Red for Fire
    case '土': color = '255, 193, 7'; break; // Yellow for Earth
    case '金': color = '158, 158, 158'; break; // Grey for Metal
    case '水': color = '33, 150, 243'; break; // Blue for Water
    default: color = '51, 51, 51';
  }
  
  return opacity < 1 ? `rgba(${color}, ${opacity})` : `rgb(${color})`;
}

function getStatusDescription(status: string): string {
  switch (status) {
    case '旺': return '过强，有余';
    case '相': return '较强，适中偏强';
    case '平': return '平衡，适中';
    case '弱': return '较弱，不足';
    case '休': return '极弱，严重不足';
    default: return '未知';
  }
}

const ElementAnalysis: React.FC<ElementAnalysisProps> = ({ 
  elementStrengths, 
  dayMaster, 
  useful, 
  avoid 
}) => {
  // 排序五行，从强到弱
  const sortedElements = [...elementStrengths].sort((a, b) => b.value - a.value);
  
  return (
    <Container>
      <Title>五行分析</Title>
      
      <ElementGrid>
        {sortedElements.map((el, index) => (
          <ElementCard key={index}>
            <ElementHeader element={el.element}>
              {el.element}
            </ElementHeader>
            <ElementBody>
              <ElementStat>
                <span>数量：</span>
                <ElementValue>{el.value.toFixed(1)}</ElementValue>
              </ElementStat>
              <ElementStat>
                <span>状态：</span>
                <ElementValue 
                  highlight={el.element === dayMaster.element}
                >
                  {el.status}
                </ElementValue>
              </ElementStat>
              <ElementBar>
                <ElementBarFill value={el.value} element={el.element} />
              </ElementBar>
            </ElementBody>
          </ElementCard>
        ))}
      </ElementGrid>
      
      <Section>
        <SectionTitle>日主五行</SectionTitle>
        <p>
          <strong>日主五行：</strong> 
          <ElementTag element={dayMaster.element}>
            {dayMaster.element}
          </ElementTag>
        </p>
        <p>
          <strong>日主状态：</strong> {dayMaster.status}（{getStatusDescription(dayMaster.status)}）
        </p>
        <p>
          <strong>日主强度：</strong> {dayMaster.value.toFixed(1)}
        </p>
      </Section>
      
      <Section>
        <SectionTitle>命局喜忌</SectionTitle>
        <p><strong>喜用神：</strong></p>
        <div>
          {useful.map((element, index) => (
            <ElementTag key={index} element={element}>
              {element}
            </ElementTag>
          ))}
        </div>
        
        <p style={{ marginTop: '15px' }}><strong>忌神：</strong></p>
        <div>
          {avoid.map((element, index) => (
            <ElementTag key={index} element={element}>
              {element}
            </ElementTag>
          ))}
        </div>
      </Section>
      
      <Section>
        <SectionTitle>分析说明</SectionTitle>
        <p>
          本命局中，日主五行为
          <ElementTag element={dayMaster.element}>{dayMaster.element}</ElementTag>，
          状态为{dayMaster.status}（{getStatusDescription(dayMaster.status)}）。
        </p>
        
        {dayMaster.status === '旺' || dayMaster.status === '相' ? (
          <p>
            日主偏强，根据"扶抑理论"，需要抑制日主，
            故取
            {useful.map((element, index) => (
              <ElementTag key={index} element={element}>{element}</ElementTag>
            ))}
            为喜用，有利于命局平衡。
          </p>
        ) : (
          <p>
            日主偏弱，根据"扶抑理论"，需要扶助日主，
            故取
            {useful.map((element, index) => (
              <ElementTag key={index} element={element}>{element}</ElementTag>
            ))}
            为喜用，有利于命局平衡。
          </p>
        )}
        
        <p>
          命局五行状况：
          {sortedElements.map((el, index) => (
            <span key={index}>
              {index > 0 && '，'}
              {el.element}（{el.status}）
            </span>
          ))}
        </p>
      </Section>
    </Container>
  );
};

export default ElementAnalysis; 