import { Image, StyleSheet, Platform, View, Alert, Linking, Button } from 'react-native';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [camera, setCamera] = useState<{ latitude: number, longitude: number } | undefined>(undefined);

  useEffect(() => {
    // requestPermission()
    // setCameraToCurrentLocation()
    // (async () => {
    //   await checkGeoPermission()
    //   await checkGeoPermission()
    //   await setCameraToCurrentLocation()
    // })();
    checkGeoPermission()
      .catch(grantGeoPermission)
      .finally(setCameraToCurrentLocation)

  }, []);

  const checkGeoPermission = async () => {
    let permission = await Location.getForegroundPermissionsAsync()
    if (permission.status !== 'granted') {
      console.log('Permission denied')
      throw new Error('Permission denied')
    }
  }

  const grantGeoPermission = async () => {
    let permission = await Location.requestForegroundPermissionsAsync()
    console.log({ permission })
    if (permission.status !== 'granted' && permission.canAskAgain === false) {

      Alert.alert('Permission denied',
        'You have denied permission to access location. Please enable it in settings.', [
        {
          text: 'Open settings',
          onPress: () => Linking.openSettings()
        }
      ])
    }
  }

  const setCameraToCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync()
    setCamera({ latitude: coords.latitude, longitude: coords.longitude })
  }

  return (
    <View style={{ flex: 1 }}>
      <NaverMapView
        style={{ flex: 1 }}
        camera={camera}
        isShowScaleBar={false}
        isNightModeEnabled
        isIndoorEnabled
        isShowIndoorLevelPicker
        isExtentBoundedInKorea
        // isLiteModeEnabled
        isShowLocationButton={false}
        isShowZoomControls={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
});

