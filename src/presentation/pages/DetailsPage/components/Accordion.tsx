import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import Label from '../../../components/Label';
import fonts from '../../../styles/fonts';
import theme, { IColors } from '../../../styles/theme';

interface IProps {
  title: string;
  children: Array<any> | any;
  onAccordionOpened: Function;
}

const PADDING = 25;
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function Accordion(props: IProps) {
  const positionY = useRef();
  const { onAccordionOpened } = props;
  const [isOpen, setOpen] = useState(false);
  const { themePalette } = useContext(theme);
  const accordionAnimations = useAccordionAnimation();

  useEffect(() => {
    if (isOpen) {
      onAccordionOpened(
        (accordionAnimations.contentHeight || 0) + PADDING,
        isOpen,
        positionY.current,
      );
    }
  }, [onAccordionOpened, accordionAnimations.contentHeight, isOpen]);

  const onContentLayout = ({ nativeEvent: { layout } }) => {
    if (!accordionAnimations.contentHeight) {
      accordionAnimations.setContentHeight(layout.height);
    }
  };

  const toggleAccordion = () => {
    Animated.timing(accordionAnimations.animatedController, {
      toValue: !isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setOpen(!isOpen);
  };

  const animatedContentStyle = {
    height: !accordionAnimations.contentHeight
      ? undefined
      : accordionAnimations.animatedHeight,
    padding: accordionAnimations.animatedPadding,
    opacity: accordionAnimations.animatedOpacity,
    backgroundColor: themePalette.white2,
  };

  const animtedChevronStyle = {
    transform: [{ rotateX: accordionAnimations.chevronAngle }],
  };
  return (
    <Pressable
      onPress={toggleAccordion}
      onLayout={({ nativeEvent }) => {
        positionY.current = nativeEvent.layout.y;
      }}>
      <Header backgroundColor={themePalette.white3}>
        <StyledLabel autoCapitalize font={fonts.h2}>
          {props.title}
        </StyledLabel>
        <AnimatedIcon
          color={themePalette.primary}
          name="expand-more"
          size={fonts.icons.default}
          style={animtedChevronStyle}
        />
      </Header>
      <Animated.View
        style={[animated.collapsible, animatedContentStyle]}
        onLayout={onContentLayout}>
        {props.children}
      </Animated.View>
    </Pressable>
  );
}

Accordion.defaultProps = {
  onAccordionOpened: () => {},
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  background-color: ${(props) => props.backgroundColor};
  padding: 0px 10px;
`;
const StyledLabel = styled(Label)`
  padding: 10px 0px;
`;

const animated = StyleSheet.create({
  collapsible: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
});

const useAccordionAnimation = () => {
  const [contentHeight, setContentHeight] = useState(null);

  const animatedController = useRef(new Animated.Value(0)).current;

  const animatedHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (contentHeight || 0) + PADDING],
  });

  const animatedOpacity = animatedController.interpolate({
    inputRange: [0, 0.5, 0.75, 1],
    outputRange: [0, 0.25, 0.5, 1],
  });
  const chevronAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  const animatedPadding = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return {
    contentHeight,
    setContentHeight,
    animatedController,
    animatedHeight,
    animatedOpacity,
    chevronAngle,
    animatedPadding,
  };
};
