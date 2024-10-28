import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function CafeDetail() {
  const { sid } = useLocalSearchParams();

  const copy = `
![Image](https://picsum.photos/1600)
# Hello This is a cafe 

**This is some bold text!**

This is normal text
Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.

## Wow

![Image](https://www.spacex.com/static/images/locations/kennedy.jpg)

I like SpaceX

### SpaceX is cool

Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
`;


  return (
    <ScrollView style={{ flex: 1, padding: 32 }} >
      <SafeAreaView />
      {/* <WebView */}
      {/*   style={{ flex: 1, marginTop: 0, padding: 0, height: 800 }} */}
      {/*   source={{ uri: `https://m.place.naver.com/place/${sid}` }} */}
      {/* /> */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Markdown>
        {copy}
      </Markdown>
      <SafeAreaView />
    </ScrollView>
  );

}
