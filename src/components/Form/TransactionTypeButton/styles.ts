import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps extends IconProps {
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: ${({ isActive }) => isActive ? 0 : '1.5px'}; 
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type, theme }) => isActive && type === 'up' && css`
    background-color: ${theme.colors.success_light};
  `}
  ${({ isActive, type, theme }) => isActive && type === 'down' && css`
    background-color: ${theme.colors.attention_light};
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ type, theme }) => type === 'up'
    ? theme.colors.success
    : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;