import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import Animated from "react-native-reanimated";

export default function CafeDetail() {
  const { sid, data } = useLocalSearchParams();
  // const params = useLocalSearchParams();
  // const {data} = useSearchParams()

  const copy = `
![Image](https://www.spacex.com/static/images/locations/kennedy.jpg)

# Hello This is a cafe

## Wow

I like SpaceX

### SpaceX is cool

Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
`;

  // useEffect(() => console.log(params), [params]);

  return (
    <ScrollView
      style={{ flex: 1, padding: 32, backgroundColor: "#FFFFFF", opacity: 0.8 }}
    >
      <SafeAreaView />
      {/* <WebView */}
      {/*   style={{ flex: 1, marginTop: 0, padding: 0, height: 800 }} */}
      {/*   source={{ uri: `https://m.place.naver.com/place/${sid}` }} */}
      {/* /> */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Back</Text>
      </TouchableOpacity>

      <Text>{sid}</Text>
      <Text>{data}</Text>
      {/* <Text>{JSON.parse(data as string)["name"]}</Text> */}

      {/* <Markdown> */}
      {/*   {copy} */}
      {/* </Markdown> */}
      {/* <Animated.Image */}
      {/*   sharedTransitionTag={sid as string} */}
      {/*   style={{ flex: 1, objectFit: "cover", height: 6000 }} */}
      {/*   source={{ */}
      {/*     uri: imgUrl as string */}
      {/*   }} */}
      {/* /> */}

      <SafeAreaView />
    </ScrollView>
  );
}
