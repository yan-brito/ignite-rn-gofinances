import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';

import { 
  Container, 
  Header, 
  Icon, 
  Photo, 
  User, 
  UserGreeting, 
  UserInfo, 
  UserName, 
  UserWrapper,
  HighlightCards,
} from './styles';

export default function Dashboard() {
  return(
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/yan-brito.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Yan</UserName>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      
      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Entradas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última transação dia 13 de abril" 
        />
        <HighlightCard 
          type="down"
          title="Saídas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última saída dia 13 de abril" 
        />
        <HighlightCard 
          type="total"
          title="Total" 
          amount="R$ 17.400,00" 
          lastTransaction="01 à 16 de abril" 
        />
      </HighlightCards>
    </Container>
  );
};