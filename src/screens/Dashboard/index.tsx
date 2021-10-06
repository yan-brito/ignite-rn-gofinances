import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
  Transactions,
  Title,
  TransactionList
} from './styles';

export type DataListProps = TransactionCardProps & {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { 
        name: 'Vendas', 
        icon: 'dollar-sign'
      },
      date: "10/10/2021"
    }, 
    {
      id: '2',
      type: 'negative',
      title: "Pizza",
      amount: "R$ 59,00",
      category: { 
        name: 'Alimentação', 
        icon: 'coffee'
      },
      date: "13/09/2021"
    }, 
    {
      id: '3',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 1.500,00",
      category: { 
        name: 'Casa', 
        icon: 'shopping-bag'
      },
      date: "10/08/2021"
    } 
  ]

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

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />
        
      </Transactions>
    </Container>
  );
};