import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import styles from '../components/style';

export default function DespesasScreen() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    buscarDespesas();
  }, []);

  const buscarDespesas = async () => {
    const { data, error } = await supabase.from('despesas').select('*');
    if (error) {
      Alert.alert('Erro ao buscar despesas', error.message);
    } else {
      setDespesas(data);
    }
  };

  const adicionarDespesa = async () => {
    if (!descricao || !valor) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    const { error } = await supabase.from('despesas').insert([{ descricao, valor: parseFloat(valor) }]);
    if (error) {
      Alert.alert('Erro ao adicionar despesa', error.message);
    } else {
      setDescricao('');
      setValor('');
      buscarDespesas();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Despesas</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Button title="Adicionar" onPress={adicionarDespesa} />

      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.descricao} - R$ ${item.valor.toFixed(2)}`}</Text>
        )}
      />
    </View>
  );
}
