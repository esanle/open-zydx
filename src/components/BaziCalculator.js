import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { calculateBazi, calculateElementRelationships, calculateDayMasterStrength, calculateFavorableElements } from '../utils/baziUtils';
import BaziChart from './BaziChart';
import ElementAnalysis from './ElementAnalysis';
import DetailedPillar from './DetailedPillar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputSection = styled.section`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    border-color: #8B0000;
    outline: none;
  }
`;

const Button = styled.button`
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
`;

const ResultSection = styled.section`
  display: ${props => props.visible ? 'block' : 'none'};
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 24px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function BaziCalculator() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    birthDate: moment().format('YYYY-MM-DD'),
    birthTime: moment().format('HH:mm')
  });
  
  const [baziResult, setBaziResult] = useState(null);
  const [elementRelationships, setElementRelationships] = useState([]);
  const [dayMasterStrength, setDayMasterStrength] = useState(null);
  const [favorableElements, setFavorableElements] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine date and time
    const dateTimeStr = `${formData.birthDate} ${formData.birthTime}`;
    const dateTime = moment(dateTimeStr, 'YYYY-MM-DD HH:mm');
    
    // Calculate BaZi
    const bazi = calculateBazi(dateTime);
    setBaziResult(bazi);
    
    // Calculate element relationships
    const relationships = calculateElementRelationships(bazi);
    setElementRelationships(relationships);
    
    // Calculate day master strength
    const dayMaster = calculateDayMasterStrength(bazi);
    setDayMasterStrength(dayMaster);
    
    // Calculate favorable elements
    const favorable = calculateFavorableElements(bazi);
    setFavorableElements(favorable);
  };
  
  return (
    <Container>
      <InputSection>
        <SectionTitle>输入信息</SectionTitle>
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">姓名：</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="请输入姓名"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="gender">性别：</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="birthDate">出生日期：</Label>
              <Input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="birthTime">出生时间：</Label>
              <Input
                type="time"
                id="birthTime"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormRow>
          
          <Button type="submit">排盘</Button>
        </form>
      </InputSection>
      
      <ResultSection visible={baziResult !== null}>
        {baziResult && (
          <>
            <SectionTitle>八字排盘结果</SectionTitle>
            <div>
              <p><strong>姓名：</strong> {formData.name}</p>
              <p><strong>性别：</strong> {formData.gender}</p>
              <p><strong>公历：</strong> {baziResult.solarDate.formatted}</p>
              <p><strong>农历：</strong> {baziResult.lunarDate.formatted}</p>
              <p><strong>传统历：</strong> {baziResult.lunarDate.dateStr}</p>
            </div>
            
            <BaziChart 
              pillars={baziResult.pillars} 
              dayMasterElement={dayMasterStrength?.element} 
            />
            
            <DetailedPillar 
              pillars={baziResult.pillars}
            />
            
            <ElementAnalysis 
              relationships={elementRelationships}
              dayMaster={dayMasterStrength}
              favorable={favorableElements}
            />
          </>
        )}
      </ResultSection>
    </Container>
  );
}

export default BaziCalculator; 