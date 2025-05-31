import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { supabase } from '../lib/supabase';
import styles from '../components/style';

export default function ExportacaoScreen() {
  const [exportando, setExportando] = useState(false);

  const gerarCSV = (dados, tipo) => {
    if (!dados.length) return '';

    const cabecalho = Object.keys(dados[0]).join(',');
    const linhas = dados.map(obj =>
      Object.values(obj).map(val => `"${val}"`).join(',')
    );

    return [`Tipo: ${tipo}`, cabecalho, ...linhas, ''].join('\n');
  };

  const exportarDados = async () => {
    setExportando(true);

    const { data: despesas, error: errDespesas } = await supabase.from('despesas').select('*');
    const { data: receitas, error: errReceitas } = await supabase.from('receitas').select('*');

    if (errDespesas || errReceitas) {
      Alert.alert('Erro ao buscar dados', (errDespesas || errReceitas).message);
      setExportando(false);
      return;
    }

    const csvDespesas = gerarCSV(despesas, 'Despesas');
    const csvReceitas = gerarCSV(receitas, 'Receitas');
    const conteudoFinal = `${csvDespesas}\n${csvReceitas}`;

    try {
      const caminho = `${FileSystem.documentDirectory}dados_financeiros.csv`;
      await FileSystem.writeAsStringAsync(caminho, conteudoFinal, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(caminho);
    } catch (error) {
      Alert.alert('Erro ao exportar', error.message);
    }

    setExportando(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exportar Dados Financeiros</Text>

      <Button
        title={exportando ? 'Exportando...' : 'Exportar para CSV'}
        onPress={exportarDados}
        disabled={exportando}
      />
    </View>
  );
}
