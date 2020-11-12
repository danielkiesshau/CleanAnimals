import React, { useContext } from 'react';
import { Text, TextProps } from 'react-native';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';
import theme, { EColors, IColors } from '../styles/theme';
import { capitalize } from '../../utils/stringUtils';

interface IProps extends TextProps {
  font: typeof fonts.h1;
  color: string;
  autoCapitalize: boolean;
}

export default function Label(props: IProps) {
  const themePalette = useContext(theme);
  let word: string = props.children;
  if (word && props.autoCapitalize) {
    word = capitalize(word);
  }

  console.log('FONT', props.customColor);

  const styles = [
    props.style,
    {
      color: props.customColor || themePalette[props.color],
      ...props.font,
    },
  ];
  return (
    <Text {...props} style={styles}>
      {word}
    </Text>
  );
}

Label.defaultProps = {
  font: fonts.t1,
  color: EColors.black,
  autoCapitalize: false,
};
