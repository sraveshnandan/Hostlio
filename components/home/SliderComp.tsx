import { hp, wp } from "@/constants";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

interface SliderItem {
  id: number;
  image: any;
  title: string;
  btnText: string;
  link: string;
}

interface HorizontalSliderProps {
  data: SliderItem[];
  renderItem: ({ item }: { item: SliderItem }) => JSX.Element;
  loop?: boolean;
  timing?: number;
  containerStyle?: ViewStyle;
}
const HorizontalSlider = ({
  data,
  renderItem,
  loop = true,
  timing = 3000,
  containerStyle,
}: HorizontalSliderProps) => {
  const flatListRef = useRef<FlatList<SliderItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= data.length) nextIndex = 0;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }, timing);

      return () => clearInterval(interval);
    }
  }, [currentIndex, loop, timing]);

  return (
    <View className="relative" style={{ height: hp(24) }}>
      <View style={[styles.container, containerStyle]}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_: any, index: number) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: hp(20),
    overflow: "hidden",
    borderRadius: 12,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dot: {
    width: wp(5),
    height: 8,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007AFF",
    width: wp(10),
    height: 8,
  },
});
