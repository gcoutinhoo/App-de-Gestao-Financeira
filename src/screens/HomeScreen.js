import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/style';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao App MEI</Text>

      <Button title="Receitas" onPress={() => navigation.navigate('Receitas')} />
      <Button title="Despesas" onPress={() => navigation.navigate('Despesas')} />
      <Button title="Orçamento" onPress={() => navigation.navigate('Orcamento')} />
      <Button title="Exportar Dados" onPress={() => navigation.navigate('Exportacao')} />
    </View>
  );
}
