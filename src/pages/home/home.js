import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './home.style';
import PostCard from '../../components/PostCard';
import database from '@react-native-firebase/database';
import Loading from '../../components/Loading/loading.js';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database()
      .ref('posts/allposts/')
      .on('value', snapshot => {
        const contendData = parseContentData(snapshot.val());
        const parsedData = sortData(contendData);
        setData(parsedData);
        setLoading(false);
      });
  }, []);

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
        <Text style={styles.pageTitle}>Keşfet</Text>
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

export default Home;
