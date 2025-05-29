import React from 'react';
import styled from 'styled-components';
import { STEMS_ELEMENTS } from '../utils/baziUtils';

const ChartContainer = styled.div`
  margin: 30px 0;
  border: 2px solid #8B0000;
  padding: 20px;
  background-color: #FFF8F0;
  border-radius: 8px;
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

const PillarBox = styled.div`
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

const StemBox = styled.div`
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

const HiddenStem = styled.span`
  font-size: 14px;
  color: ${props => getElementColor(props.element)};
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

function BaziChart({ pillars, dayMasterElement }) {
  return (
    <ChartContainer>
      <ChartTitle>八字命盘</ChartTitle>
      <ChartGrid>
        {pillars.map((pillar, index) => (
          <PillarBox 
            key={index} 
            isDay={index === 2} // Highlight the day pillar
          >
            <PillarName>{pillar.name}</PillarName>
            <StemBox element={pillar.stemElement}>
              {pillar.stem}
              <ElementTag>{pillar.stemElement}</ElementTag>
            </StemBox>
            <BranchBox element={pillar.branchElement}>
              {pillar.branch}
              <ElementTag>{pillar.branchElement}</ElementTag>
            </BranchBox>
            <HiddenStemsContainer>
              {pillar.hiddenStems.map((stem, i) => (
                <HiddenStem key={i} element={STEMS_ELEMENTS[stem]}>
                  [{stem}]
                </HiddenStem>
              ))}
            </HiddenStemsContainer>
          </PillarBox>
        ))}
      </ChartGrid>
    </ChartContainer>
  );
}

export default BaziChart; 