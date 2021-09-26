import React from 'react';

import { 
  Container, 
  Header, 
  Icon, 
  Photo, 
  User, 
  UserGreeting, 
  UserInfo, 
  UserName, 
  UserWrapper 
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
    </Container>
  );
};