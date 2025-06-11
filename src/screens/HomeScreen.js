import React from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import styles from '../components/style';

export default function HomeScreen() {
  const navigation = useNavigation();

  const resetarMes = async () => {
    Alert.alert(
      'Novo mês',
      'Tem certeza que deseja limpar os dados e começar um novo mês?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            await supabase.from('despesas').delete().neq('id', 0);
            await supabase.from('receitas').delete().neq('id', 0);
            await supabase.from('orcamentos').delete().neq('id', 0);
            Alert.alert('Tudo pronto!', 'Os dados foram limpos para o novo mês.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text style={styles.texto}>Escolha uma opção</Text>

      <Button title="Receitas" onPress={() => navigation.navigate('Receitas')} />
      <Button title="Despesas" onPress={() => navigation.navigate('Despesas')} />
      <Button title="Resumo Financeiro" onPress={() => navigation.navigate('Orcamento')} />

      <View style={styles.footer}>
        <TouchableOpacity onPress={resetarMes}>
          <Text style={styles.resetText}>Avançar para o próximo mês</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
