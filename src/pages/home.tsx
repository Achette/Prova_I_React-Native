import React, {FormEvent} from 'react';
import {Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Home = ({navigation}: any) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <Text> The Rick and Morty </Text>
      <Text> Clique em entrar para continuar </Text>

      <Button title="Entrar" onPress={() => handleLogin()} />
    </SafeAreaView>
  );
};
