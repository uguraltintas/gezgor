import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './postcard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

const PostCard = ({onPress, data}) => {
  const date = formatDistance(parseISO(data.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <TouchableOpacity onPress={onPress}>
          <View>
            <Text style={styles.locationName}>{data.location_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.commentContainer}>
        <Text>{data.comment}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

export default PostCard;
