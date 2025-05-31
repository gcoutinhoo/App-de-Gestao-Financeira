// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/app/login';
import HomeScreen from './src/screens/HomeScreen';
import DespesasScreen from './src/screens/DespesasScreen';
import ReceitasScreen from './src/screens/ReceitasScreen';
import OrcamentoScreen from './src/screens/OrcamentoScreen';
import ExportacaoScreen from './src/screens/ExportacaoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Despesas" component={DespesasScreen} />
        <Stack.Screen name="Receitas" component={ReceitasScreen} />
        <Stack.Screen name="Orcamento" component={OrcamentoScreen} />
        <Stack.Screen name="Exportacao" component={ExportacaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
