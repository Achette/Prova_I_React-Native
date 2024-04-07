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

export const Character = ({route}: any) => {
  const {name, status, species, image, location, episode, created} =
    route.params;
  const localeDate = moment(created).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <Container>
      <Card style={{width: '90%'}}>
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
