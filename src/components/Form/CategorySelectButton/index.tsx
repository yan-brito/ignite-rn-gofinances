import React from 'react';
import { Category, Container, Icon } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
  title: string;
}

export function CategorySelectButton({ title, ...rest }: Props) {
  return(
    <Container {...rest}>
      <Category> { title } </Category>
      <Icon name="chevron-down"/>
    </Container>
  );
};