import React from 'react';
import styled from 'styled-components/native';
import { getTypeColor } from '../../../../data/services/utils/pokeApiUtils';
import { getLabelConstrated } from '../../../../utils/styleUtils';
import Label from '../../../components/Label';
import fonts from '../../../styles/fonts';

const Type = (props) => {
  const backgroundColor = getTypeColor(props.type);
  return (
    <ContainerType backgroundColor={backgroundColor}>
      <TypeLabel
        autoCapitalize
        font={fonts.h1}
        color={getLabelConstrated(backgroundColor)}>
        {props.type}
      </TypeLabel>
    </ContainerType>
  );
};

export default Type;

const ContainerType = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 39px;
  background-color: ${(props) => props.backgroundColor};
`;

const TypeLabel = styled(Label).attrs((props) => ({
  customColor: props.color,
}))`
  text-align: center;
`;
