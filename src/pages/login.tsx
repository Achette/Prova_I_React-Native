import React from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';

export const Login = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>LOGIN</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your e-mail"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.subLoginText}>Já tem uma conta? Faça login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginText: {
    fontSize: 40,
    color: '#4CAF50',
    marginTop: 20,
    marginBottom: 40,

  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  subLoginText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
