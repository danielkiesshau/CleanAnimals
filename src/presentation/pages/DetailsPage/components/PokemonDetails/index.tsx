import React from 'react';
import Pokemon from '../../../../../domain/models/Pokemon';
import Section from '../Section';
import Moves from './Moves';
import Stats from './Stats';
import Type from './Type';

interface Props {
  animal: Pokemon;
  onAccordionOpened: Function;
}

export default function PokemonDetails(props: Props) {
  return (
    <>
      <Section isRow title="Type">
        {props.animal.type?.map((type) => (
          <Type key={type} type={type} />
        ))}
      </Section>
      <Stats animal={props.animal} />
      <Moves
        animal={props.animal}
        onAccordionOpened={props.onAccordionOpened}
      />
    </>
  );
}
