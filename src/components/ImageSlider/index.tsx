import { FlatList } from "react-native-gesture-handler";
import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from "./styles";
import { ViewToken } from "react-native";
import { useRef, useState } from "react";

interface ImageSliderProps {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((image, index) => {
          const isActive = imageIndex === index;
          return <ImageIndex key={image} active={isActive} />;
        })}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(image) => {
          return image;
        }}
        horizontal
        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <CarImageWrapper>
              <CarImage
                source={{
                  uri: item,
                }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          );
        }}
      />
    </Container>
  );
}
