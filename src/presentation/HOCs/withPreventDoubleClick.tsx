import React, { useCallback, useState } from 'react';

export default function withPreventDoubleClick(Component) {
  return (props) => {
    const [isDisabled, setDisabled] = useState(false);

    const onPress = useCallback(
      (e) => {
        if (!isDisabled) {
          props.onPress(e);
          setDisabled(true);
          setTimeout(() => {
            setDisabled(false);
          }, 1500);
        }
      },
      [isDisabled, setDisabled, props],
    );
    return <Component {...props} onPress={onPress} />;
  };
}
