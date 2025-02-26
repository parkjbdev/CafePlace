import { Alert, Linking, SafeAreaView, ScrollView, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { useRef } from "react";

export default function MyBookmarkPage() {
  const mapRef = useRef<MapView>(null)

  return <View style={{ flex: 1 }}>
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      minDelta={0.01}
      maxDelta={3}
      cameraZoomRange={{
        minCenterCoordinateDistance: 20,
        maxCenterCoordinateDistance: 18,
        animated: true
      }}
      showsCompass
      showsScale
      showsMyLocationButton
      showsUserLocation
    />
    <ScrollView>
      <SafeAreaView />
      <Text>My Bookmarks</Text>
    </ScrollView>
  </View>
}
