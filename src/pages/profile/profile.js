import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './profile.style';
import PostCard from '../../components/PostCard';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loading from '../../components/Loading/loading.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState('');
  const user = auth().currentUser;

  useEffect(() => {
    database()
      .ref('/users/' + user.uid)
      .once('value')
      .then(snapshot => {
        setUserdata(snapshot.val());
      });
  }, [user.uid]);

  const logout = () => {
    auth().signOut();
  };

  useEffect(() => {
    database()
      .ref('posts/' + user.uid + '/')
      .on('value', snapshot => {
        const contendData = parseContentData(snapshot.val());
        const parsedData = sortData(contendData);
        setData(parsedData);
        setLoading(false);
      });
  }, [user]);

  const sortData = contendData => {
    if (!contendData) {
      return;
    }
    return contendData.sort(function (a, b) {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
  };

  const parseContentData = contendData => {
    if (!contendData) {
      return;
    }
    return Object.keys(contendData).map(key => {
      return {
        id: key,
        ...contendData[key],
      };
    });
  };

  const navigateToPostCardLocation = async items => {
    const locationcoords = items.location;
    const location_name = items.location_name;
    const location = {locationcoords, location_name};
    navigation.navigate('Postcardlocation', location);
  };

  const renderItem = ({item}) => (
    <PostCard onPress={() => navigateToPostCardLocation(item)} data={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>{userdata.username}</Text>
        <TouchableOpacity onPress={logout}>
          <Icon name="exit-to-app" size={30} color="#FFF9B0" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Profile;
