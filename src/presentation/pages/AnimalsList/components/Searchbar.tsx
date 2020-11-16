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
}

const Searchbar = forwardRef((props: IProps, ref) => {
  const themeContext: IColors = useContext(theme);
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
      color={themeContext.primary}
      size={24}
    />
  );

  return (
    <Container theme={themeContext}>
      <Icon name="search" color={themeContext.gray1} size={27} />
      <SearchText
        placeholder={props.placeholder}
        ref={ref}
        data-test="search-input"
        theme={themeContext}
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
  background-color: ${(props: ContainerProps) => props.theme.white1};
  align-self: stretch;
  margin: 0px 4px 0px;
  padding: 9px 13px 9px 13px;
  box-shadow: 0px 3px 6px ${(props: ContainerProps) => props.theme.shadow};
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
