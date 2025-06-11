import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import styles from '../components/style';

export default function OrcamentoScreen() {
  const [valorReceita, setValorReceita] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [porcentagemGasta, setPorcentagemGasta] = useState(null);

  useEffect(() => {
    calcularResumo();
  }, []);

  const calcularResumo = async () => {
    const { data: receitas, error: errorReceitas } = await supabase
      .from('receitas')
      .select('valor');

    const { data: despesas, error: errorDespesas } = await supabase
      .from('despesas')
      .select('valor');

    if (errorReceitas || errorDespesas) {
      Alert.alert('Erro ao buscar dados');
      return;
    }

    const somaReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
    const somaDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);

    setTotalReceitas(somaReceitas);
    setTotalDespesas(somaDespesas);

    if (somaReceitas > 0) {
      const porcentagem = (somaDespesas / somaReceitas) * 100;
      setPorcentagemGasta(porcentagem.toFixed(2));
    } else {
      setPorcentagemGasta(null);
    }
  };

  return (
    <View style={styles.containerResumo}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>

      <Text style={styles.textoResumo}>Total Receitas: R$ {totalReceitas.toFixed(2)}</Text>
      <Text style={styles.textoResumo}>Total Despesas: R$ {totalDespesas.toFixed(2)}</Text>

      {porcentagemGasta !== null ? (
        <Text style={styles.porcentagem}>Você gastou {porcentagemGasta}% da sua renda.</Text>
      ) : (
        <Text style={styles.porcentagem}>Sem dados suficientes para cálculo.</Text>
      )}

      <Button title="Atualizar" onPress={calcularResumo} color="#3119FC" />
    </View>
  );
}