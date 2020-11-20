import React from 'react';
import styled from 'styled-components/native';
import Label from 'presentation/components/Label';
import fonts from 'presentation/styles/fonts';

const Section = (props) => (
  <ContainerSection>
    <StyledLabel font={fonts.h1}>{props.title}</StyledLabel>
    <SectionContent isRow={props.isRow} isWrap={props.isWrap}>
      {props.children}
    </SectionContent>
  </ContainerSection>
);

export default Section;

const ContainerSection = styled.View`
  align-self: stretch;
  align-items: flex-start;
  margin: 10px 0px 0px;
`;

const StyledLabel = styled(Label)`
  margin: 0px 0px 10px 10px;
`;

const SectionContent = styled.View`
  align-self: stretch;
  flex-direction: ${(props) => (props.isRow ? 'row' : 'column')};
  flex-wrap: ${(props) => (props.isWrap ? 'wrap' : 'nowrap')};
`;
