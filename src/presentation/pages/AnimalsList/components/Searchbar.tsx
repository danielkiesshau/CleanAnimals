import React, {
  forwardRef,
  Ref,
  useCallback,
  useContext,
  useImperativeHandle,
} from 'react';
import { TextInputProps, ViewProps } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import theme, { Colors } from 'presentation/styles/theme';

interface Props {
  initialValue?: string;
  onSearch: (text: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isEditable?: boolean;
  ref?: Ref<TextInput>;
}

const Searchbar = forwardRef((props: Props, ref) => {
  const { themePalette } = useContext(theme);
  const [search, setSearch] = React.useState(props.initialValue);

  useImperativeHandle(ref, () => ({
    resetInput: () => {
      setSearch('');
    },
  }));

  const onSearch = useCallback(
    (text) => {
      setSearch(text);
      props.onSearch(text);
    },
    [props],
  );

  const clearButton = search.length > 0 && (
    <BorderlessButton
      testID="clear-button"
      onPress={() => {
        setSearch('');
        props.onSearch('');
      }}>
      <Icon name="highlight-off" color={themePalette.primary} size={24} />
    </BorderlessButton>
  );

  return (
    <Container theme={themePalette} isDisabled={props.isDisabled}>
      <Icon name="search" color={themePalette.gray1} size={27} />
      <SearchText
        editable={props.isEditable}
        placeholder={props.placeholder}
        placeholderTextColor={themePalette.gray3}
        ref={ref}
        testID="search-input"
        theme={themePalette}
        value={search}
        onChangeText={onSearch}
        autoCapitalize="none"
      />
      {clearButton}
    </Container>
  );
});

Searchbar.defaultProps = {
  initialValue: '',
};

export default Searchbar;

interface ContainerProps extends ViewProps {
  theme: Colors;
  isDisabled?: boolean;
}

const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.white2};
  align-self: stretch;
  margin: 0px 4px 0px;
  padding: 9px 13px 9px 13px;
  box-shadow: 0px 3px 6px ${(props) => props.theme.shadow};
  elevation: ${(props) => (props.isDisabled ? 0 : 2)};
`;

interface SearchProps extends TextInputProps {
  theme: Colors;
}

const SearchText = styled.TextInput<SearchProps>`
  flex: 1;
  height: 22px;
  padding: 0px 10px;
  color: ${(props) => props.theme.gray1};
`;
