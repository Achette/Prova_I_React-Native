import moment from 'moment';
import {
  Avatar,
  Card,
  Container,
  InfoText,
  LabelText,
  Name,
  Status,
} from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

export const Character = ({route}: any) => {
  const {name, status, species, image, location, episode, created} =
    route.params;
  const localeDate = moment(created).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <Avatar source={{uri: image}} />
        <Name>{name}</Name>
        <LabelText>Created at</LabelText>
        <InfoText>{localeDate}</InfoText>
        <Status>
          {status == 'Alive' ? (
            <Icon name="circle" size={8} color="#0f0" />
          ) : status == 'Dead' ? (
            <Icon name="circle" size={10} color="#f00" />
          ) : (
            <Icon name="circle" size={8} color="#808080" />
          )}
          {status} - {species}
        </Status>
        <LabelText>Last known location</LabelText>
        <InfoText>{location}</InfoText>
        <LabelText>First seen in</LabelText>
        <InfoText>{episode}</InfoText>
      </Card>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
  card:{
    backgroundColor: '#00ff0d',
    borderColor: '#28a82e68',
    borderWidth: 2,
  }
});