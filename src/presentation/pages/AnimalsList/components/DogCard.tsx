import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Dog from 'domain/models/Dog';
import Label from 'presentation/components/Label';
import withPreventDoubleClick from 'presentation/HOCs/withPreventDoubleClick';
import fonts from 'presentation/styles/fonts';
import theme from 'presentation/styles/theme';
import { RectButton } from 'react-native-gesture-handler';
import ContentLoader, { Rect } from 'react-content-loader/native';

interface Props {
  dog: Dog;
  onPress: any;
}
const SinglePress = withPreventDoubleClick(RectButton);
export default function DogCard(props: Props) {
  const { themePalette } = useContext(theme);
  return (
    <Container
      testID={'poke-card'}
      onPress={() => {
        props.onPress(props.animal);
      }}
      theme={themePalette}>
      <Image
        source={{
          uri: props.animal.image,
        }}
        resizeMode="cover"
      />
      <ContainerLabels>
        <StyledLabel
          numberOfLines={1}
          customColor={themePalette.black}
          autoCapitalize
          font={fonts.h1}>
          {props.animal.name}
        </StyledLabel>
        <RightContainer>
          <Label
            customColor={themePalette.black}
            autoCapitalize
            font={fonts.h1}>
            {props.animal.breedGroup}
          </Label>
        </RightContainer>
      </ContainerLabels>
    </Container>
  );
}

export const DogCardSkeleton = () => {
  const { themePalette } = useContext(theme);
  return (
    <SkeletonContainer theme={themePalette}>
      <ContentLoader
        width="100%"
        height="70"
        backgroundColor={themePalette.white3}
        foregroundColor={themePalette.lightPrimary}>
        <Rect x="15" y="4" rx="4" ry="4" height="60" width="60" />
        <Rect x="20%" rx="4" ry="4" y="28" width="25%" height="10" />
        <Rect x="89%" rx="4" ry="4" y="28" width="10%" height="10" />
      </ContentLoader>
    </SkeletonContainer>
  );
};

const StyledLabel = styled(Label)`
  flex: 1;
  margin: 0px 10px;
`;

const BaseView = styled(SinglePress)`
  height: 70px;
  padding: 0px 0px 0px 0px;
  width: 100%;
  background-color: ${(props) => props.theme.white3};
  margin: 2px 0px;
`;

const SkeletonContainer = styled(BaseView).attrs(() => ({
  onPress: () => {},
  activeOpacity: 0,
}))``;

const Container = styled(BaseView)`
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
`;

const Image = styled.Image`
  height: 70px;
  width: 70px;
  margin: 0px 4px 0px 0px;
`;

const ContainerLabels = styled.View`
  flex: 1;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightContainer = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
