import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import styles from '../components/style';

export default function ReceitasScreen() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    buscarReceitas();
  }, []);

  const buscarReceitas = async () => {
    const { data, error } = await supabase.from('receitas').select('*');
    if (error) {
      Alert.alert('Erro ao buscar receitas', error.message);
    } else {
      setReceitas(data);
    }
  };

  const adicionarReceita = async () => {
    if (!descricao || !valor) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    const { error } = await supabase.from('receitas').insert([{ descricao, valor: parseFloat(valor) }]);
    if (error) {
      Alert.alert('Erro ao adicionar receita', error.message);
    } else {
      setDescricao('');
      setValor('');
      buscarReceitas();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Receitas</Text>

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

      <Button title="Adicionar" onPress={adicionarReceita} />

      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.descricao} - R$ ${item.valor.toFixed(2)}`}</Text>
        )}
      />
    </View>
  );
}
