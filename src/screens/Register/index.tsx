import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import { 
  Container, 
  Fields, 
  Form, 
  Header, 
  Title, 
  TransactionsTypes 
} from './styles';
interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('O nome é obrigatório!'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico!')
  .positive('O valor não pode ser negativo!')
  .required('O valor é obrigatório!')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();
  
  const navigation = useNavigation();
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
   } = useForm({
     resolver: yupResolver(schema)
   });

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }
    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }
    
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      const dataKey =  `@gofinances:transactions_user:${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const formattedData = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      const actualData = await AsyncStorage.getItem(dataKey);

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      //@ts-ignore
      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }

  }


  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            placeholder="Nome"
            name="name"
            control={control}
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
            />
          <InputForm 
            placeholder="Preço"
            name="amount"
            control={control}
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
          <TransactionsTypes>
            <TransactionTypeButton 
              title="Income" 
              type="up" 
              onPress={() => handleTransactionTypeSelect('positive')}
              isActive={transactionType === 'positive'}
            />
            <TransactionTypeButton 
              title="Outcome" 
              type="down" 
              onPress={() => handleTransactionTypeSelect('negative')}
              isActive={transactionType === 'negative'}
            />
          </TransactionsTypes>

          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <Button 
          title="Enviar"
          // @ts-ignore - tinha que tipar melhor o react-hook-forms, sem tempo irmão
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
    </TouchableWithoutFeedback>
  );
};
