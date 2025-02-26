import {
  SafeAreaView,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchDetails } from "@/api/fetchCafes";
import Carousel, { CarouselData } from "@/components/carousel";
import StyledText from "@/components/atoms/text/StyledText";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Home() {
  const [cafes, setCafes] = useState<CarouselData[]>([]);

  useEffect(() => {
    fetchDetails(0, 20).then((res) =>
      setCafes(
        res.map((item: any) => {
          return {
            id: item.sid,
            name: item.name,
            memo: item.memo,
            address: item.address,
            url: `cafe/${item.sid}`,
            imgUrl: item.placeInfo.thumbnailUrls[0],
            externalUrl: item.url,
          };
        }),
      ),
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView />
      <Carousel data={cafes} />

      <View style={{ marginBottom: 16 }}>
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          おすすめカフェ
        </ThemedText>
        <ThemedText>Home</ThemedText>
        <ThemedText>
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    alignItems: "center",
  },
});
