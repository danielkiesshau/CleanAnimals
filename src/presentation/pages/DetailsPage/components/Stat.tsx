import React from 'react';
import styled from 'styled-components/native';
import { dashCamelCase } from '../../../../utils/stringUtils';
import { getLabelConstrated } from '../../../../utils/styleUtils';
import Label from '../../../components/Label';
import fonts from '../../../styles/fonts';

interface IProps {
  stat: string;
  value: number;
  backgroundColor: string;
}

const Stat = (props: IProps) => {
  return (
    <ContainerState backgroundColor={props.backgroundColor}>
      <TypeLabel
        font={fonts.t1}
        color={getLabelConstrated(props.backgroundColor)}>
        {dashCamelCase(props.stat)}
      </TypeLabel>
      <TypeLabel
        font={fonts.t1}
        color={getLabelConstrated(props.backgroundColor)}>
        {props.value}
      </TypeLabel>
    </ContainerState>
  );
};

export default Stat;

const ContainerState = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 14px;
  height: 39px;
  width: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

const TypeLabel = styled(Label).attrs((props) => ({
  customColor: props.color,
}))`
  text-align: center;
`;
