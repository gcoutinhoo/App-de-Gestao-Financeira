import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import styles from '../components/style';

export default function OrcamentoScreen() {
  const [valorOrcamento, setValorOrcamento] = useState('');
  const [orcamentoAtual, setOrcamentoAtual] = useState(null);

  useEffect(() => {
    buscarOrcamento();
  }, []);

  const buscarOrcamento = async () => {
    const { data, error } = await supabase
      .from('orcamento')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      Alert.alert('Erro ao buscar orçamento', error.message);
    } else {
      setOrcamentoAtual(data || null);
    }
  };

  const salvarOrcamento = async () => {
    const valor = parseFloat(valorOrcamento);

    if (isNaN(valor)) {
      Alert.alert('Erro', 'Digite um valor válido');
      return;
    }

    let error;

    if (orcamentoAtual) {
      // Atualizar orçamento existente
      ({ error } = await supabase
        .from('orcamento')
        .update({ valor })
        .eq('id', orcamentoAtual.id));
    } else {
      // Inserir novo orçamento
      ({ error } = await supabase.from('orcamento').insert([{ valor }]));
    }

    if (error) {
      Alert.alert('Erro ao salvar orçamento', error.message);
    } else {
      setValorOrcamento('');
      buscarOrcamento();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Orçamento Mensal</Text>

      {orcamentoAtual && orcamentoAtual.valor !== undefined && (
        <Text style={{ marginBottom: 10 }}>
          Orçamento atual: R$ {orcamentoAtual.valor.toFixed(2)}
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Novo valor"
        keyboardType="numeric"
        value={valorOrcamento}
        onChangeText={setValorOrcamento}
      />

      <Button title="Salvar Orçamento" onPress={salvarOrcamento} />
    </View>
  );
}
