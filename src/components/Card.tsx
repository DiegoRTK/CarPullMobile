import React from 'react';
import {Card, CardProps, Text} from 'react-native-elements';

interface CardSharedProps extends CardProps {
  title: string;
  onPress?: () => void;
}

const CardShared: React.FC<CardSharedProps> = ({title, onPress}) => {
  return (
    <Card containerStyle={{}} wrapperStyle={{}} onPress={onPress}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
    </Card>
  );
};

export default CardShared;
