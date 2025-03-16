import { hp } from "@/constants";
import { Ibanner } from "@/types";
import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import ImageViewer from "react-native-image-zoom-viewer";

const { width } = Dimensions.get("window");

interface ImageItem {
  public_id: string;
  url: string;
}

interface ImageSliderProps {
  images: Ibanner[];
  containerHeight?: number;
  imageHeight?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  containerHeight,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity
      onPress={() => openImage(item.url)}
      style={styles.imageContainer}>
      <Image
        source={{ uri: item.url }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <View className="mt-2">
      <Carousel
        ref={ref}
        loop
        width={width * 0.99}
        height={hp(containerHeight ?? 28)}
        autoPlay={true}
        data={images as any}
        style={styles.slider}
        scrollAnimationDuration={2000}
        renderItem={renderItem}
        pagingEnabled
        mode={"horizontal-stack"}
        modeConfig={{
          snapDirection: "left",
          stackInterval: 18,
        }}
        customConfig={() => ({ type: "positive", viewCount: 5 })}
      />

      {/* Full-Screen Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          {selectedImage && (
            <ImageViewer
              imageUrls={[{ url: selectedImage }]}
              enableSwipeDown={true}
              onSwipeDown={() => setModalVisible(false)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: width - 10,
    height: 240,
    borderRadius: 12,
    objectFit: "cover",
    aspectRatio: "16/9",
    marginHorizontal: 10,
  },
  slider: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  modalBackground: {
    flex: 1,
  },
});

export default ImageSlider;
