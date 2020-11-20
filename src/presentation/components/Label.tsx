import React, { useContext } from 'react';
import { Text, TextProps } from 'react-native';
import fonts, { FontType } from '../styles/fonts';
import theme, { EColors } from '../styles/theme';
import { capitalize } from '../../utils/stringUtils';

interface Props extends TextProps {
  font: FontType;
  color: string;
  autoCapitalize: boolean;
  children: string;
  customColor?: string;
}

export default function Label(props: Props) {
  const { themePalette } = useContext(theme);
  let word: string = props.children;
  if (word && props.autoCapitalize) {
    word = capitalize(word);
  }

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
