import React from 'react';
import styled from 'styled-components';
import { BRANCHES_ELEMENTS, STEMS_ELEMENTS, HIDDEN_STEMS } from '../utils/baziUtils';

interface PillarProps {
  stem: string;
  branch: string;
  stemElement: string;
  branchElement: string;
  hiddenStems: string[];
  name: string;
  isDay?: boolean;
}

interface BaziChartProps {
  pillars: {
    year: PillarProps;
    month: PillarProps;
    day: PillarProps;
    time: PillarProps;
  };
  title?: string;
}

const ChartContainer = styled.div`
  margin: 30px 0;
`;

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #8B0000;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PillarBox = styled.div<{ isDay?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
  background-color: ${props => props.isDay ? '#FFF0E0' : '#fff'};
  border-radius: 4px;
  box-shadow: ${props => props.isDay ? '0 0 10px rgba(139, 0, 0, 0.2)' : 'none'};
`;

const PillarName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: #8B0000;
`;

const StemBox = styled.div<{ element: string }>`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 32px;
  background-color: #fff;
  color: ${props => getElementColor(props.element)};
  position: relative;
`;

const BranchBox = styled(StemBox)`
  margin-bottom: 5px;
`;

const ElementTag = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
  color: #666;
`;

const HiddenStemsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 5px;
`;

const HiddenStem = styled.span<{ element: string }>`
  font-size: 14px;
  color: ${props => getElementColor(props.element)};
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 15px;
  background-color: #ddd;
  margin: 5px 0;
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

const Pillar: React.FC<PillarProps> = ({ 
  stem, 
  branch, 
  stemElement, 
  branchElement, 
  hiddenStems, 
  name, 
  isDay 
}) => {
  return (
    <PillarBox isDay={isDay}>
      <PillarName>{name}</PillarName>
      <StemBox element={stemElement}>
        {stem}
        <ElementTag>{stemElement}</ElementTag>
      </StemBox>
      <VerticalLine />
      <BranchBox element={branchElement}>
        {branch}
        <ElementTag>{branchElement}</ElementTag>
      </BranchBox>
      <HiddenStemsContainer>
        {hiddenStems.map((stem, i) => (
          <HiddenStem key={i} element={STEMS_ELEMENTS[stem]}>
            [{stem}]
          </HiddenStem>
        ))}
      </HiddenStemsContainer>
    </PillarBox>
  );
};

const BaziChart: React.FC<BaziChartProps> = ({ pillars, title = '八字命盘' }) => {
  return (
    <ChartContainer className="paper-red">
      <ChartTitle>{title}</ChartTitle>
      <ChartGrid>
        <Pillar 
          stem={pillars.year.stem} 
          branch={pillars.year.branch} 
          stemElement={pillars.year.stemElement} 
          branchElement={pillars.year.branchElement} 
          hiddenStems={pillars.year.hiddenStems} 
          name="年柱" 
        />
        <Pillar 
          stem={pillars.month.stem} 
          branch={pillars.month.branch} 
          stemElement={pillars.month.stemElement} 
          branchElement={pillars.month.branchElement} 
          hiddenStems={pillars.month.hiddenStems} 
          name="月柱" 
        />
        <Pillar 
          stem={pillars.day.stem} 
          branch={pillars.day.branch} 
          stemElement={pillars.day.stemElement} 
          branchElement={pillars.day.branchElement} 
          hiddenStems={pillars.day.hiddenStems} 
          name="日柱" 
          isDay={true}
        />
        <Pillar 
          stem={pillars.time.stem} 
          branch={pillars.time.branch} 
          stemElement={pillars.time.stemElement} 
          branchElement={pillars.time.branchElement} 
          hiddenStems={pillars.time.hiddenStems} 
          name="时柱" 
        />
      </ChartGrid>
    </ChartContainer>
  );
};

export default BaziChart; 