import { Href, Link, router } from "expo-router";
import { Text, Dimensions, TouchableHighlight, View } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel"
import Animated from "react-native-reanimated"

export interface CarouselData {
  id: string
  name: string
  memo: string
  address: string
  url: Href<string>
  imgUrl: string
  externalUrl: Href<string>
}

export default function Carousel({ data }: { data: CarouselData[] }) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return <ReanimatedCarousel
    style={{ alignSelf: "center", borderRadius: 16, marginBottom: 16 }}
    width={width - 32}
    height={height - 300}
    // This option is for carousel in scrollview
    panGestureHandlerProps={{
      activeOffsetX: [-10, 10],
    }}
    loop
    autoPlay={true}
    autoPlayInterval={5000}
    data={data}
    scrollAnimationDuration={1000}
    renderItem={({ index }) => (
      <TouchableHighlight style={{ flex: 1 }} onPress={() => {
        router.setParams({ data: JSON.stringify(data[index]) })
        // router.setParams({ imgUrl: data[index]["placeInfo"]["thumbnailUrls"][0] })
        router.push(data[index].url)
      }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Animated.Image
            sharedTransitionTag={data[index].id}
            style={{ flex: 1, objectFit: "cover", height: 6000 }}
            source={{
              uri: data[index].imgUrl
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
              {data[index].name}
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 12 }}>
              {data[index].address}
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 16 }}>
              {data[index].memo}
            </Text>
            <Link href={data[index].externalUrl}>
              <Text>Instagram &gt;</Text>
            </Link>
          </View>
        </View>
      </TouchableHighlight>
    )
    }
  />
}
