import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DatePicker, TimePicker, Input, Select, Button, Form, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { 
  calculateBazi, 
  calculateElementRelationships, 
  getDayMasterStrength,
  getUsefulGods,
  getElementStatus,
  calculateTenGods,
  STEMS_ELEMENTS,
  BRANCHES_ELEMENTS,
  YIN_YANG,
  SOUND_ELEMENTS
} from '../utils/baziUtils';
import BaziChart from './BaziChart';
import ElementAnalysis from './ElementAnalysis';
import DetailedPillar from './DetailedPillar';

const { Option } = Select;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FormItem = styled(Form.Item)`
  flex: 1;
  margin-bottom: 0;
`;

const StyledButton = styled(Button)`
  background-color: #8B0000;
  border-color: #8B0000;
  
  &:hover, &:focus {
    background-color: #6B0000;
    border-color: #6B0000;
  }
`;

const ResultSection = styled.div<{ visible: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ResultTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const PersonInfo = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  
  strong {
    min-width: 70px;
  }
`;

const BaziCalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [baziResult, setBaziResult] = useState<any>(null);
  
  const onFinish = (values: any) => {
    setLoading(true);
    
    try {
      // 合并日期和时间
      const dateTime = moment(values.birthDate).hour(moment(values.birthTime).hour()).minute(moment(values.birthTime).minute());
      
      // 计算八字
      const bazi = calculateBazi(dateTime);
      
      // 转换为组件所需格式
      const pillarsForChart = {
        year: {
          stem: bazi.year.stem,
          branch: bazi.year.branch,
          stemElement: bazi.year.element,
          branchElement: BRANCHES_ELEMENTS[bazi.year.branch],
          hiddenStems: bazi.year.hidden,
          name: '年柱'
        },
        month: {
          stem: bazi.month.stem,
          branch: bazi.month.branch,
          stemElement: bazi.month.element,
          branchElement: BRANCHES_ELEMENTS[bazi.month.branch],
          hiddenStems: bazi.month.hidden,
          name: '月柱'
        },
        day: {
          stem: bazi.day.stem,
          branch: bazi.day.branch,
          stemElement: bazi.day.element,
          branchElement: BRANCHES_ELEMENTS[bazi.day.branch],
          hiddenStems: bazi.day.hidden,
          name: '日柱'
        },
        time: {
          stem: bazi.time.stem,
          branch: bazi.time.branch,
          stemElement: bazi.time.element,
          branchElement: BRANCHES_ELEMENTS[bazi.time.branch],
          hiddenStems: bazi.time.hidden,
          name: '时柱'
        }
      };
      
      // 计算十神关系
      const tenGods = calculateTenGods(bazi);
      
      // 计算纳音五行
      const naYin = {
        year: SOUND_ELEMENTS[bazi.year.stem + bazi.year.branch] || '',
        month: SOUND_ELEMENTS[bazi.month.stem + bazi.month.branch] || '',
        day: SOUND_ELEMENTS[bazi.day.stem + bazi.day.branch] || '',
        time: SOUND_ELEMENTS[bazi.time.stem + bazi.time.branch] || ''
      };
      
      // 为DetailedPillar组件准备数据
      const pillarsForDetailed = {
        year: {
          name: '年柱',
          stem: bazi.year.stem,
          branch: bazi.year.branch,
          stemElement: bazi.year.element,
          branchElement: BRANCHES_ELEMENTS[bazi.year.branch],
          hiddenStems: bazi.year.hidden,
          tenGods: [tenGods.year, ...tenGods.yearBranch],
          yinYang: {
            stem: YIN_YANG[bazi.year.stem],
            branch: YIN_YANG[bazi.year.branch]
          },
          naYin: naYin.year
        },
        month: {
          name: '月柱',
          stem: bazi.month.stem,
          branch: bazi.month.branch,
          stemElement: bazi.month.element,
          branchElement: BRANCHES_ELEMENTS[bazi.month.branch],
          hiddenStems: bazi.month.hidden,
          tenGods: [tenGods.month, ...tenGods.monthBranch],
          yinYang: {
            stem: YIN_YANG[bazi.month.stem],
            branch: YIN_YANG[bazi.month.branch]
          },
          naYin: naYin.month
        },
        day: {
          name: '日柱',
          stem: bazi.day.stem,
          branch: bazi.day.branch,
          stemElement: bazi.day.element,
          branchElement: BRANCHES_ELEMENTS[bazi.day.branch],
          hiddenStems: bazi.day.hidden,
          tenGods: tenGods.dayBranch,
          yinYang: {
            stem: YIN_YANG[bazi.day.stem],
            branch: YIN_YANG[bazi.day.branch]
          },
          naYin: naYin.day
        },
        time: {
          name: '时柱',
          stem: bazi.time.stem,
          branch: bazi.time.branch,
          stemElement: bazi.time.element,
          branchElement: BRANCHES_ELEMENTS[bazi.time.branch],
          hiddenStems: bazi.time.hidden,
          tenGods: [tenGods.time, ...tenGods.timeBranch],
          yinYang: {
            stem: YIN_YANG[bazi.time.stem],
            branch: YIN_YANG[bazi.time.branch]
          },
          naYin: naYin.time
        }
      };
      
      // 计算五行强度
      const elementRelationships = calculateElementRelationships(bazi);
      const elementStrengths = Object.entries(elementRelationships).map(([element, value]) => ({
        element,
        value,
        status: getElementStatus(value)
      }));
      
      // 计算日主强度
      const dayMaster = getDayMasterStrength(bazi);
      
      // 计算用神和忌神
      const { useful, avoid } = getUsefulGods(bazi);
      
      // 设置结果
      setBaziResult({
        personInfo: {
          name: values.name,
          gender: values.gender,
          birthDate: dateTime.format('YYYY年MM月DD日'),
          birthTime: dateTime.format('HH:mm'),
          lunarDate: bazi.lunarDate
        },
        pillarsForChart,
        pillarsForDetailed,
        elementStrengths,
        dayMaster,
        useful,
        avoid
      });
    } catch (error) {
      console.error('计算八字出错:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <InputSection>
        <FormTitle>命盘信息输入</FormTitle>
        <Form
          form={form}
          name="bazi_calculator"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            gender: '男',
            birthDate: moment(),
            birthTime: moment()
          }}
        >
          <FormRow>
            <FormItem
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入姓名" />
            </FormItem>
            
            <FormItem
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </FormItem>
          </FormRow>
          
          <FormRow>
            <FormItem
              name="birthDate"
              label="出生日期"
              rules={[{ required: true, message: '请选择出生日期' }]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </FormItem>
            
            <FormItem
              name="birthTime"
              label="出生时间"
              rules={[{ required: true, message: '请选择出生时间' }]}
            >
              <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={5} />
            </FormItem>
          </FormRow>
          
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading}>
              排盘
            </StyledButton>
          </Form.Item>
        </Form>
      </InputSection>
      
      <ResultSection visible={baziResult !== null}>
        {baziResult && (
          <>
            <ResultTitle>八字排盘结果</ResultTitle>
            <PersonInfo>
              <InfoItem>
                <strong>姓名：</strong>
                <span>{baziResult.personInfo.name}</span>
              </InfoItem>
              <InfoItem>
                <strong>性别：</strong>
                <span>{baziResult.personInfo.gender}</span>
              </InfoItem>
              <InfoItem>
                <strong>公历：</strong>
                <span>{baziResult.personInfo.birthDate} {baziResult.personInfo.birthTime}</span>
              </InfoItem>
              <InfoItem>
                <strong>农历：</strong>
                <span>{baziResult.lunarDate}</span>
              </InfoItem>
            </PersonInfo>
            
            <BaziChart pillars={baziResult.pillarsForChart} />
            
            <DetailedPillar pillars={baziResult.pillarsForDetailed} />
            
            <ElementAnalysis 
              elementStrengths={baziResult.elementStrengths}
              dayMaster={baziResult.dayMaster}
              useful={baziResult.useful}
              avoid={baziResult.avoid}
            />
          </>
        )}
      </ResultSection>
    </Container>
  );
};

export default BaziCalculator; 