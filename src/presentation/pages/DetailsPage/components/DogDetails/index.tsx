import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Dog from 'domain/models/Dog';
import theme from 'presentation/styles/theme';
import Section from '../Section';
import Card from '../Card';
import Label from 'presentation/components/Label';
import fonts from 'presentation/styles/fonts';
import styled from 'styled-components/native';
import Accordion from '../Accordion';

interface Props {
  animal: Dog;
  onAccordionOpened: Function;
}

export default function DogDetails(props: Props) {
  const { themePalette } = useContext(theme);
  return (
    <>
      <Section isRow isWrap title="Details">
        <Card
          stat="Breed"
          noCamel
          value={props.animal.breedGroup}
          backgroundColor={themePalette.white3}
          l1Style={styles.l1}
        />
        <Card
          stat="Life span"
          noCamel
          value={props.animal.lifeSpan}
          backgroundColor={themePalette.secondary}
        />
      </Section>
      <Container>
        <Accordion
          startOpen
          onAccordionOpened={props.onAccordionOpened}
          title="Temperament">
          <Label font={fonts.t0}>{props.animal.temperament}</Label>
        </Accordion>
      </Container>
    </>
  );
}

DogDetails.defaultProps = {
  onAccordionOpened: () => {},
};

const Container = styled.View`
  margin-top: 15px;
`;

const styles = StyleSheet.create({
  l1: { marginLeft: 7 },
});
