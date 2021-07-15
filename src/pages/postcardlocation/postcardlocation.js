import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import styles from './postcardlocation.style';

const PostCardLocation = ({route, navigation}) => {
  const {locationcoords, location_name} = route.params;
  const {latitude, longitude} = locationcoords;
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
      }}>
      <Marker
        coordinate={{latitude: latitude, longitude: longitude}}
        title={location_name}
      />
    </MapView>
  );
};

export default PostCardLocation;
