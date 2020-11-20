import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
} from 'react';
import { TextInputProps, ViewProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import theme, { IColors } from '../../../styles/theme';

interface IProps {
  initialValue: string;
  onSearch: (text: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isEditable?: boolean;
}

const Searchbar = forwardRef((props: IProps, ref) => {
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
    <Icon
      data-test="clear-button"
      onPress={() => {
        setSearch('');
        props.onSearch('');
      }}
      name="highlight-off"
      color={themePalette.primary}
      size={24}
    />
  );

  return (
    <Container theme={themePalette} isDisabled={props.isDisabled}>
      <Icon name="search" color={themePalette.gray1} size={27} />
      <SearchText
        editable={props.isEditable}
        placeholder={props.placeholder}
        placeholderTextColor={themePalette.gray3}
        ref={ref}
        data-test="search-input"
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
  theme: IColors;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props: ContainerProps) => props.theme.white2};
  align-self: stretch;
  margin: 0px 4px 0px;
  padding: 9px 13px 9px 13px;
  box-shadow: 0px 3px 6px ${(props: ContainerProps) => props.theme.shadow};
  elevation: ${(props) => (props.isDisabled ? 0 : 2)};
`;

interface SearchProps extends TextInputProps {
  theme: IColors;
}

const SearchText = styled.TextInput`
  flex: 1;
  height: 22px;
  padding: 0px 10px;
  color: ${(props: SearchProps) => props.theme.gray1};
`;
