import React from 'react';
import { api } from '../services/api';
import {
  Avatar,
  Card,
  CardButton,
  CardButtonText,
  CardButtons,
  CardContent,
  CardInfos,
  Container,
  Form,
  InfoText,
  Input,
  LabelText,
  List,
  Name,
  Status,
  SubmitButton,
} from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, Keyboard, StyleSheet } from 'react-native';

type CharacterProps = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  location: string;
  episode: string;
  created: string;
};
export const Main = ({ navigation }: any) => {
  const [newCharacter, setNewCharacter] = React.useState('');
  const [characters, setCharacters] = React.useState<CharacterProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      const storedCharacters = await AsyncStorage.getItem('characters');
      if (storedCharacters) {
        setCharacters(JSON.parse(storedCharacters));
      }
    };

    fetchCharacters();
  }, []);

  React.useEffect(() => {
    const saveCharacters = async () => {
      await AsyncStorage.setItem('characters', JSON.stringify(characters));
    };

    saveCharacters();
  }, [characters]);

  const handleAddNewCharacter = React.useCallback(async () => {
    if (!newCharacter) {
      Alert.alert('Digite um personagem para adicionar');
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.get(`/?name=${newCharacter}`);
      const data = response.data.results[0];

      if (characters.find(character => character.id === data.id)) {
        Alert.alert('Personagem já está adicionado na lista.');
        setIsLoading(false);
        setNewCharacter('');
        Keyboard.dismiss();
        return;
      }

      const firstEpisodeResponse = await api.get(data.episode[0]);

      const mappedData = {
        id: data.id,
        name: data.name,
        status: data.status,
        species: data.species,
        image: data.image,
        location: data.location.name,
        episode: firstEpisodeResponse.data.name,
        created: data.created,
      };

      setCharacters([...characters, mappedData]);
      Keyboard.dismiss();
    } catch (e) {
      console.error(e);
      Alert.alert('Algo não funcionou como deveria, tente novamente!');
    } finally {
      setIsLoading(false);
      setNewCharacter('');
    }
  }, [newCharacter, characters]);

  return (
    <Container style={styles.container}>
      <Form>
        <Input
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar personagem"
          value={newCharacter}
          onChangeText={character => setNewCharacter(character)}
          returnKeyType="send"
          onSubmitEditing={handleAddNewCharacter}
        />
        <SubmitButton style={styles.SubmitButton} loading={isLoading} onPress={handleAddNewCharacter}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>

      <List
        showsVerticalScrollIndicator={false}
        data={characters}
        keyExtractor={character => character.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardContent>
              <Avatar source={{ uri: item.image }} />
              <CardInfos>
                <Name>{item.name}</Name>
                <Status>
                  {item.status} - {item.species}
                </Status>
                <LabelText>Last known location</LabelText>
                <InfoText>{item.location}</InfoText>
                <LabelText>First seen in</LabelText>
                <InfoText>{item.episode}</InfoText>
              </CardInfos>
            </CardContent>
            <CardButtons>
              <CardButton
                onPress={() => {
                  navigation.navigate('Character', {
                    name: item.name,
                    status: item.status,
                    species: item.species,
                    image: item.image,
                    location: item.location,
                    episode: item.episode,
                    created: item.created,
                  });
                }}>
                <CardButtonText>Mais detalhes</CardButtonText>
              </CardButton>
              <CardButton
                onPress={() => {
                  setCharacters(
                    characters.filter(character => character.id !== item.id),
                  );
                }}
                style={{ backgroundColor: 'red', borderRadius: 10 }}>
                <CardButtonText>Excluir</CardButtonText>
              </CardButton>
            </CardButtons>
          </Card>
        )}
      />
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  SubmitButton: {
    backgroundColor: '#00ff0d',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  card:{
    backgroundColor: '#00ff0d',
    borderColor: '#28a82e68',
    borderWidth: 2,
  }
});