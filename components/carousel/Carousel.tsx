import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import CarouselItem from './CarouselItem';

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

export default function Carousel({ pages, pageWidth, gap, offset }: ICarousel) {
  const [page, setPage] = useState(0);

  function renderItem({ item }: any) {
    return (
      <CarouselItem item={item} style={{ width: pageWidth, marginHorizontal: gap / 2 }} />
    );
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.indicatorWrapper}>
        {Array.from({ length: pages.length }, (_, i) => i).map((i) => (
          <View style={styles.indicator} key={`indicator_${i}`}
          // focused={i === page}
          />
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },
  indicator: {
    marginVertical: 0,
    marginHorizontal: 4,
    width: 6,
    height: 6,
    borderRadius: 3
    // backgroundColor: ${(props) => (props.focused ? '#262626' : '#dfdfdf')};
  }
});
