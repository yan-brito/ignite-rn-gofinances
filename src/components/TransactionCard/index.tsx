import React from 'react';
import { 
  Amount, 
  Category, 
  CategoryName, 
  Container, 
  Date, 
  Footer, 
  Icon, 
  Title 
} from './styles';

type Category = {
  name: string;
  icon: string;
};

export type TransactionCardProps = {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  date: string;
};

type Props = {
  data: TransactionCardProps
};

export function TransactionCard({ data }: Props) {
  const { type, title, amount, category, date } = data;

  return(
    <Container>
      <Title>{ title }</Title>

      <Amount type={type}>
        { type === 'negative' && '- '}
        { amount }
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{ category.name }</CategoryName>
        </Category>

        <Date>{ date }</Date>
      </Footer>
    </Container>
  );
};