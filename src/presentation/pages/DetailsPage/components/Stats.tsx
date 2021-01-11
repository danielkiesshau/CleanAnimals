import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Pokemon from 'domain/models/Pokemon';
import theme from 'presentation/styles/theme';
import Section from './Section';
import Stat from './Stat';

interface Props {
  animal: Pokemon;
}

export default function Stats(props: Props) {
  const { themePalette } = useContext(theme);
  const { animal } = props;

  return (
    <StatsContainer isRow isWrap title="Base stats">
      <Stat
        stat="hp"
        value={animal.stats?.hp.toString()}
        backgroundColor={themePalette.white3}
      />
      <Stat
        stat="attack"
        value={animal.stats?.attack.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="defense"
        value={animal.stats?.defense.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="specialAttack"
        value={animal.stats?.specialAttack.toString()}
        backgroundColor={themePalette.white3}
      />
      <Stat
        stat="specialDefense"
        value={animal.stats?.specialDefense.toString()}
        backgroundColor={themePalette.white3}
      />
      <Stat
        stat="speed"
        value={animal.stats?.speed.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="specialAttack"
        value={animal.stats?.specialAttack.toString()}
        backgroundColor={themePalette.secondary}
      />
      <Stat
        stat="specialDefense"
        value={animal.stats?.specialDefense.toString()}
        backgroundColor={themePalette.white3}
      />
    </StatsContainer>
  );
}

const StatsContainer = styled(Section)`
  height: 200px;
`;
