import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import styles from './sendlocation.style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import SendDataToFB from '../../helpers/senddata.js';
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import Loading from '../../components/Loading/loading.js';

const Sendlocation = ({navigation}) => {
  const [userCurrentLocation, setuserCurrentLocation] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setuserCurrentLocation({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
      });
      setLoading(false);
    });
  }, []);
  const showToast = () => {
    ToastAndroid.show('Gönderiniz Paylaşıldı!', ToastAndroid.LONG);
  };

  const sendData = async ({location_name, comment}) => {
    try {
      const user = await auth().currentUser;
      const postUUID = uuid.v4();
      Geolocation.getCurrentPosition(
        async position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          await SendDataToFB('/posts/' + user.uid + '/' + postUUID, {
            location: {latitude: lat, longitude: lng},
            location_name,
            comment,
            date: new Date().toISOString(),
          });
          await SendDataToFB('/posts/allposts/' + postUUID, {
            location: {latitude: lat, longitude: lng},
            location_name,
            comment,
            date: new Date().toISOString(),
          });
          showToast();
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Sevdiğin Mekanı Paylaş</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <MapView
          style={styles.mapViewContainer}
          initialRegion={userCurrentLocation}
          showsUserLocation={true}
        />
      )}

      <Formik
        initialValues={{location_name: '', comment: ''}}
        onSubmit={sendData}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder="Paylaşacağınız konumun ismini giriniz."
              onChangeText={handleChange('location_name')}
              value={values.email}
              maxLength={40}
            />
            <Input
              placeholder="Konum hakkında ki yorumunuzu belirtiniz."
              onChangeText={handleChange('comment')}
              value={values.password}
              multiline
              maxLength={200}
            />
            <Button onPress={handleSubmit} text="Gönderiyi Paylaş" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Sendlocation;
