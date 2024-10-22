import { Image, StyleSheet, Platform, View, Alert, Linking, Button } from 'react-native';
import { NaverMapCircleOverlay, NaverMapMarkerOverlay, NaverMapPathOverlay, NaverMapPolygonOverlay, NaverMapView } from '@mj-studio/react-native-naver-map';
import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [camera, setCamera] = useState<{ latitude: number, longitude: number } | undefined>(undefined);

  const [cafes, setCafes] = useState<any[]>([]);
  const url = 'https://pages.map.naver.com/save-pages/api/maps-bookmark/v3/shares/863dc82b56c94070879b3cfa2c706b1f/bookmarks?sort=lastUseTime'

  useEffect(() => {
    checkGeoPermission()
      .catch(grantGeoPermission)
      .finally(setCameraToCurrentLocation)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCafes(data.bookmarkList)
        console.log(`Cafe Set: ${data}`)
      })
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
        isLiteModeEnabled
        // isShowLocationButton={false}
        isShowZoomControls={false}
      >
        {cafes.map((cafe, index) => {
          return <NaverMapMarkerOverlay
            key={cafe.bookmarkId}
            latitude={cafe.py}
            longitude={cafe.px}
            caption={{
              text: cafe.name,
            }}
            subCaption={{
              text: cafe.memo,
            }}
            onTap={() => Alert.alert(cafe.name, `${cafe.address}`)}
            isMaxZoomInclusive
            // minZoom={20}
            isHideCollidedCaptions
            isHideCollidedMarkers
            isMinZoomInclusive={false}
            isIconPerspectiveEnabled
          >
            <View style={{ width: 20, height: 20, borderRadius: 10 }}>
              <Ionicons size={20} name="cafe" />
            </View>
          </NaverMapMarkerOverlay>
        })}
      </NaverMapView>
    </View >
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

