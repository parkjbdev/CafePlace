import { TouchableOpacity, View, Alert, Linking, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { BookmarkPlace } from '@/interfaces/map';
import { fetchSummary } from '@/api/fetchCafes';


export default function MapPage() {
  const [cafes, setCafes] = useState<BookmarkPlace[]>([]);
  const [selectedCafeIdx, setSelectedCafeIdx] = useState<number | null>(null)
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false)
  const mapRef = useRef<MapView>(null)

  const fetchCafes = () => {
    return fetchSummary().then(setCafes)
  }

  const requireGeoPermission = async () => {
    let permission = await Location.getForegroundPermissionsAsync()
    if (permission.status !== 'granted') {
      if (permission.canAskAgain) {
        await Location.requestForegroundPermissionsAsync()
      }
      else {
        Alert.alert(
          '위치권한 없음',
          'CafePlace를 이용하려면 위치권한이 필요합니다. 설정에서 위치권한을 허용해주세요',
          [
            {
              text: '설정 열기',
              onPress: Linking.openSettings
            }
          ])
      }
    }
  }

  const setCameraToCurrentLocation = async () => {
    try {
      console.log("setCameraToCurrentLocation")
      setLoadingLocation(true)
      let pos = await Location.getLastKnownPositionAsync()
      if (!pos) pos = await Location.getCurrentPositionAsync()
      const { coords } = pos
      setLoadingLocation(false)
      if (mapRef.current) {
        mapRef.current.animateCamera({ center: { latitude: coords.latitude, longitude: coords.longitude }, heading: 0, pitch: 0 }, { duration: 500 })
      }
    } catch (e) {
      await requireGeoPermission()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          position: "absolute",
          alignSelf: "flex-end", bottom: 20, right: 20,
          width: 50, height: 50, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 50, zIndex: 1
        }}
        onPress={setCameraToCurrentLocation}
      >
        {
          loadingLocation ?
            <ActivityIndicator /> :
            <Ionicons name="locate" size={30} />
        }
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        minDelta={0.03}
        maxDelta={7}
        cameraZoomRange={{
          minCenterCoordinateDistance: 20,
          maxCenterCoordinateDistance: 18,
          animated: true
        }}
        onMarkerDeselect={() => {
          setSelectedCafeIdx(null)
        }}
        onMapReady={() => {
          fetchCafes().then(setCameraToCurrentLocation)
        }}
        showsCompass
        showsScale
        showsMyLocationButton
        showsUserLocation
      >
        {cafes.map((cafe, idx) =>
          <Marker
            key={cafe.sid}
            style={{ width: 50, height: 50 }}
            coordinate={{ latitude: cafe.py, longitude: cafe.px }}
            onPress={async () => {
              setSelectedCafeIdx(idx)
              const camera = await mapRef.current?.getCamera()
              mapRef.current?.animateCamera({ ...camera, center: { latitude: cafe.py, longitude: cafe.px } }, { duration: 500 })
            }}
            onCalloutPress={() => {
              setSelectedCafeIdx(idx)
              Alert.alert(cafe.name, `${cafe.address}`)
              Linking.openURL(`https://m.place.naver.com/place/${cafe.sid}`);
            }}
            calloutAnchor={{ x: 0, y: 0 }}
            title={cafe.name}
            description={cafe.memo}
          >
          </Marker>
        )}
      </MapView>
    </View>
  );
}
