import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { camelCaseDash } from '../../../../utils/stringUtils';
import { getConstratedColor } from '../../../../utils/styleUtils';
import Label from '../../../components/Label';
import fonts from '../../../styles/fonts';

interface Props {
  stat: string;
  value: string;
  backgroundColor: string;
}

const Stat = (props: Props) => {
  return (
    <Container backgroundColor={props.backgroundColor}>
      <TypeLabel
        font={fonts.t1}
        color={getConstratedColor(props.backgroundColor)}>
        {camelCaseDash(props.stat)}
      </TypeLabel>
      <TypeLabel
        font={fonts.t1}
        color={getConstratedColor(props.backgroundColor)}>
        {props.value}
      </TypeLabel>
    </Container>
  );
};

export default Stat;

interface ContainerProps extends ViewProps {
  backgroundColor: string;
}

const Container = styled.View<ContainerProps>`
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
