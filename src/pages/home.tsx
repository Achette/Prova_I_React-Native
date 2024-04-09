import React from 'react';
import { SafeAreaView, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export const Home = ({navigation}: any) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwplk2pMYF7C4ndsrhdWbDcVy66UqV3nC9gPkFPjuVCJFFlIcK' }} // Adicione o URL da sua imagem aqui
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>The Rick and Morty</Text>
        <Text style={styles.subtitle}>Clique em entrar para continuar</Text>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#4CAF50', // Cor de fundo do botão
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
