import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Pokemon from 'domain/models/Pokemon';
import theme from 'presentation/styles/theme';
import Section from './Section';
import Stat from './Stat';

interface Props {
  pokemon: Pokemon;
}

export default function Stats(props: Props) {
  const { themePalette } = useContext(theme);
  const { pokemon } = props;

  return (
    <StatsContainer isRow isWrap title="Base stats">
      <Stat
        stat="hp"
        value={pokemon.stats.hp.toString()}
        backgroundColor={themePalette.white3}
      />
      <Stat
        stat="attack"
        value={pokemon.stats.attack.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="defense"
        value={pokemon.stats.defense.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="specialAttack"
        value={pokemon.stats.specialAttack.toString()}
        backgroundColor={themePalette.white3}
      />
      <Stat
        stat="specialDefense"
        value={pokemon.stats.specialDefense.toString()}
        backgroundColor={themePalette.white3}
      />
      <Stat
        stat="speed"
        value={pokemon.stats.speed.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="specialAttack"
        value={pokemon.stats.specialAttack.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="specialDefense"
        value={pokemon.stats.specialDefense.toString()}
        backgroundColor={themePalette.white3}
      />
    </StatsContainer>
  );
}

const StatsContainer = styled(Section)`
  height: 200px;
`;
