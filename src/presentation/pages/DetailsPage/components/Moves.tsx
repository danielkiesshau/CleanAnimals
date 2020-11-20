import React from 'react';
import { View, Text } from 'react-native';
import Pokemon from '../../../../domain/models/Pokemon';
import Label from '../../../components/Label';
import fonts from '../../../styles/fonts';
import Accordion from './Accordion';
import Section from './Section';

interface Props {
  pokemon: Pokemon;
  onAccordionOpened: Function;
}

export default function Moves(props: Props) {
  const { pokemon, onAccordionOpened } = props;

  return (
    <Section title="Moves">
      {pokemon.moves.map((move) => (
        <Accordion
          onAccordionOpened={onAccordionOpened}
          key={move.name}
          title={move.name}>
          <Label font={fonts.t2}>{move.description}</Label>
        </Accordion>
      ))}
    </Section>
  );
}
