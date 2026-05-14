import React from 'react';
import styled from 'styled-components';
import { 
  STEM_NOTES, 
  BRANCH_NOTES, 
  MAJOR_GODS, 
  STEMS_ELEMENTS 
} from '../utils/baziUtils';

interface AdditionalBaziInfoProps {
  emptyPositions: string[];
  divineSpiritsList: {
    year: string[];
    month: string[];
    day: string[];
    time: string[];
  };
  boneWeight: number;
  boneWeightComment: string;
  pillars: {
    year: { stem: string; branch: string };
    month: { stem: string; branch: string };
    day: { stem: string; branch: string };
    time: { stem: string; branch: string };
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

const SectionContainer = styled.div`
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
  border-bottom: 1px dashed #eee;
  padding-bottom: 8px;
`;

const EmptyPositionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const EmptyPosition = styled.span`
  font-size: 18px;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 5px 15px;
  border-radius: 4px;
  border: 1px dashed #ccc;
`;

const DivineSpiritGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DivineSpiritCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const DivineSpiritHeader = styled.div`
  background-color: #8B0000;
  color: white;
  padding: 8px;
  text-align: center;
  font-weight: bold;
`;

const DivineSpiritBody = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const SpiritTag = styled.span`
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoteItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const NoteCharacter = styled.span<{ element: string }>`
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background-color: ${props => getElementColor(props.element, 0.2)};
  color: ${props => getElementColor(props.element, 1)};
  font-weight: bold;
  margin-right: 10px;
`;

const BoneWeightContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
`;

const BoneWeightValue = styled.div`
  font-size: 42px;
  font-weight: bold;
  color: #8B0000;
  margin: 10px 0;
`;

const BoneWeightComment = styled.div`
  font-size: 16px;
  padding: 10px;
  border-top: 1px dashed #ddd;
  margin-top: 10px;
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

const AdditionalBaziInfo: React.FC<AdditionalBaziInfoProps> = ({ 
  emptyPositions,
  divineSpiritsList,
  boneWeight,
  boneWeightComment,
  pillars
}) => {
  return (
    <Container>
      <Title>八字详细信息</Title>
      
      {/* 空亡 */}
      <SectionContainer>
        <SectionTitle>空亡</SectionTitle>
        <p>空亡是用神的虚浮之象，代表无根无基础，此处的地支代表薄弱环节。</p>
        <EmptyPositionsContainer>
          {emptyPositions.map((pos, index) => (
            <EmptyPosition key={index}>{pos}</EmptyPosition>
          ))}
        </EmptyPositionsContainer>
      </SectionContainer>
      
      {/* 神煞 */}
      <SectionContainer>
        <SectionTitle>神煞</SectionTitle>
        <p>神煞是指八字中有特殊意义的组合，能对命局产生特定影响。</p>
        <DivineSpiritGrid>
          <DivineSpiritCard>
            <DivineSpiritHeader>年柱神煞</DivineSpiritHeader>
            <DivineSpiritBody>
              {divineSpiritsList.year.map((spirit, index) => (
                <SpiritTag key={index}>{spirit}</SpiritTag>
              ))}
            </DivineSpiritBody>
          </DivineSpiritCard>
          
          <DivineSpiritCard>
            <DivineSpiritHeader>月柱神煞</DivineSpiritHeader>
            <DivineSpiritBody>
              {divineSpiritsList.month.map((spirit, index) => (
                <SpiritTag key={index}>{spirit}</SpiritTag>
              ))}
            </DivineSpiritBody>
          </DivineSpiritCard>
          
          <DivineSpiritCard>
            <DivineSpiritHeader>日柱神煞</DivineSpiritHeader>
            <DivineSpiritBody>
              {divineSpiritsList.day.map((spirit, index) => (
                <SpiritTag key={index}>{spirit}</SpiritTag>
              ))}
            </DivineSpiritBody>
          </DivineSpiritCard>
          
          <DivineSpiritCard>
            <DivineSpiritHeader>时柱神煞</DivineSpiritHeader>
            <DivineSpiritBody>
              {divineSpiritsList.time.map((spirit, index) => (
                <SpiritTag key={index}>{spirit}</SpiritTag>
              ))}
            </DivineSpiritBody>
          </DivineSpiritCard>
        </DivineSpiritGrid>
      </SectionContainer>
      
      {/* 天干地支注意事项 */}
      <SectionContainer>
        <SectionTitle>天干留意</SectionTitle>
        <NotesGrid>
          {Object.keys(pillars).map((pillarKey) => {
            const pillar = pillars[pillarKey as keyof typeof pillars];
            const stemElement = STEMS_ELEMENTS[pillar.stem];
            return (
              <NoteItem key={pillarKey}>
                <NoteCharacter element={stemElement}>{pillar.stem}</NoteCharacter>
                {STEM_NOTES[pillar.stem]}
              </NoteItem>
            );
          })}
        </NotesGrid>
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>地支留意</SectionTitle>
        <NotesGrid>
          {Object.keys(pillars).map((pillarKey) => {
            const pillar = pillars[pillarKey as keyof typeof pillars];
            const branchElement = STEMS_ELEMENTS[pillar.branch];
            return (
              <NoteItem key={pillarKey}>
                <NoteCharacter element={branchElement}>{pillar.branch}</NoteCharacter>
                {BRANCH_NOTES[pillar.branch]}
              </NoteItem>
            );
          })}
        </NotesGrid>
      </SectionContainer>
      
      {/* 称骨重量 */}
      <SectionContainer>
        <SectionTitle>称骨重量</SectionTitle>
        <p>称骨算命法是中国传统命理学的一种，根据出生年、月、日、时计算一个人的"骨重"，以判断其一生吉凶。</p>
        
        <BoneWeightContainer>
          <div>您的骨重为</div>
          <BoneWeightValue>{boneWeight}两</BoneWeightValue>
          <BoneWeightComment>{boneWeightComment}</BoneWeightComment>
        </BoneWeightContainer>
      </SectionContainer>
    </Container>
  );
};

export default AdditionalBaziInfo; 