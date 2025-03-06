import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchDetails } from "@/api/fetchCafes";
import Carousel, { CarouselData } from "@/components/carousel";

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
    <View style={styles.container}>
      <Carousel data={cafes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: "center",
  },
});
