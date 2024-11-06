import { TouchableHighlight, Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { fetchDetails } from '@/api/fetchCafes';
import Animated from 'react-native-reanimated';

export default function Home() {
  const width = Dimensions.get('window').width;

  const [cafes, setCafes] = useState([])

  useEffect(() => {
    fetchDetails(0, 20).then(setCafes)
  }, [])

  const random = (max: number) => {
    return Math.floor(Math.random() * max);
  }

  return (
    <View style={styles.container}>
      <Carousel
        style={{ flex: 1 }}
        width={width}
        // This option is for carousel in scrollview
        // panGestureHandlerProps={{
        //   activeOffsetX: [-10, 10],
        // }}
        loop
        autoPlay={true}
        autoPlayInterval={5000}

        data={cafes}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <TouchableHighlight style={{ flex: 1 }} onPress={() => {
            router.setParams({ data: JSON.stringify(cafes[index]) })
            // router.setParams({ imgUrl: cafes[index]["placeInfo"]["thumbnailUrls"][0] })
            router.push(`/cafes/${cafes[index]["sid"]}`)
          }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Animated.Image
                sharedTransitionTag={cafes[index]["sid"]}
                style={{ flex: 1, objectFit: "cover", height: 6000 }}
                source={{
                  uri: cafes[index]["placeInfo"]["thumbnailUrls"][
                    0
                    // random((cafes[index]["placeInfo"]["thumbnailUrls"] as Array<string>).length)
                  ]
                }}
              />

              <View style={{
                position: "absolute",
                rowGap: 4,
                padding: 16,
                justifyContent: 'flex-end',
                backgroundColor: "rgba(255, 255, 255, 0.5)"
              }}>
                <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: "bold" }}>
                  {cafes[index]["name"]}
                </Text>
                <Text style={{ textAlign: 'left', fontSize: 12 }}>
                  {cafes[index]["address"]}
                </Text>
                <Text style={{ textAlign: 'left', fontSize: 16 }}>
                  {cafes[index]["memo"]}
                </Text>
                <Link href={cafes[index]["url"]}>
                  <Text>Instagram &gt;</Text>
                </Link>
              </View>
            </View>
          </TouchableHighlight>
        )
        }
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});
