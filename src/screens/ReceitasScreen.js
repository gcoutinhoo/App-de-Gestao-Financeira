import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
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
    if (!error) setReceitas(data);
  };

  const adicionarReceita = async () => {
    const numero = parseFloat(valor);
    if (!descricao || isNaN(numero)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    const { error } = await supabase.from('receitas').insert([{ descricao, valor: numero }]);
    if (!error) {
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
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={adicionarReceita}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={receitas}
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
