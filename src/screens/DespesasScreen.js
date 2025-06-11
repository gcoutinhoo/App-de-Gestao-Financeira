import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
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
    if (!error) setDespesas(data);
  };

  const adicionarDespesa = async () => {
    const numero = parseFloat(valor);
    if (!descricao || isNaN(numero)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    const { error } = await supabase.from('despesas').insert([{ descricao, valor: numero }]);
    if (!error) {
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
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={adicionarDespesa}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.descricao} - R$ {item.valor.toFixed(2)}</Text>
          </View>
        )}
        style={{ marginTop: 20, width: '100%' }}
      />
    </View>
  );
}
