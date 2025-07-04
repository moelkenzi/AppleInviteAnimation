import { View, Text, Image, Dimensions, StyleSheet, Linking } from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { AnimatedImage } from "react-native-reanimated/lib/typescript/component/Image";
import { useState } from "react";
import { Stagger } from "@animatereactnative/stagger";
import { Pressable } from "react-native-gesture-handler";

// Images
const images = [
  // "https://cdn.dribbble.com/userupload/26986432/file/original-5053a00e51cbc58f3c96105010b52f97.jpg?format=webp&resize=700x525&vertical=center",
  // "https://cdn.dribbble.com/userupload/27918277/file/original-789dad2c7d86b102936d8813358ed669.jpg?resize=752x&vertical=center",
  // "https://cdn.dribbble.com/userupload/36851346/file/original-153c6545cef1ca99fcc8c29c84f97996.jpg?resize=1504x1128&vertical=center",
  // "https://cdn.dribbble.com/userupload/36937548/file/original-83fd7df0bb26e18b2b92bf11b03c17f6.jpg?resize=752x&vertical=center",
  // "https://cdn.dribbble.com/userupload/24578264/file/original-186f6df18bfccc4974428bb060b0da3d.jpg?format=webp&resize=700x525&vertical=center",
  // "https://cdn.dribbble.com/userupload/42408881/file/original-9d6e5411740f84dfc8d6055511980f01.jpeg?resize=1200x900&vertical=center",
  // "https://cdn.dribbble.com/userupload/28002315/file/original-940ec0ab385630cb984245faf1a5b910.jpg?resize=1200x900&vertical=center",
  "https://plus.unsplash.com/premium_photo-1682464708085-95b4486e2c32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um9ib3RzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1593376893114-1aed528d80cf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Um9ib3RzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Um9ib3RzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Um9ib3RzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fFJvYm90c3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1625314887424-9f190599bd56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fFJvYm90c3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1680700308566-543a60569017?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fFJvYm90c3xlbnwwfHwwfHx8MA%3D%3D",
];

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

function Item({ image, index }: { image: string; index: number }) {
  return (
    <View
      style={{
        width: _itemWidth,
        height: _itemHeight,
      }}>
      <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 16 }} />
    </View>
  );
}

export default function AppleInvites() {
  // TODO:
  const offset = useSharedValue(0);
  const [activeIndex, setactiveIndex] = useState(0);
  const [key, setKey] = useState(0);

  useAnimatedReaction(
    () => {
      const floatIndex = ((offset.value + width / 2) / _itemSize) % images.length;
      return Math.abs(Math.round(floatIndex));
    },
    (value) => {
      // console.log(value);
      runOnJS(setactiveIndex)(value);
      // calculate the index
      // setState with the index
    }
  );

  const handleReplay = () => {
    offset.value = 0;
    setactiveIndex(0);
    setKey((prev) => prev + 1);
  };

  return (
    <View
      key={key}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}>
        <Animated.Image
          key={`image-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          style={{ flexDirection: "row", gap: _spacing }}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeight / 2 }],
            })}>
          {images.map((image, index) => (
            <Item key={`image-${index}`} image={image} index={index} />
          ))}
        </Animated.View>
      </Marquee>

      <Stagger
        initialEnteringDelay={1000}
        duration={500}
        stagger={100}
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center", marginTop: 32 }}>
        <Text style={{ color: "white", fontWeight: 500, opacity: 0.6 }}>Discover the Future</Text>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>
          RoboExplorer
        </Text>
        <Text style={{ color: "white", opacity: 0.8, textAlign: "center", paddingHorizontal: 20 }}>
          Explore the fascinating world of <Text style={{ fontWeight: "bold" }}>robotics</Text>{" "}
          through our curated collection of cutting-edge innovations and breakthroughs.
        </Text>
      </Stagger>

      <Stagger initialEnteringDelay={1500} duration={500} stagger={100} style={{ marginTop: 32 }}>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Pressable
            style={{
              paddingHorizontal: 32,
              paddingVertical: 12,
              backgroundColor: "white",
              borderRadius: 24,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>Start Exploring</Text>
            <Text style={{ fontSize: 18 }}>→</Text>
          </Pressable>

          <Pressable
            onPress={handleReplay}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#00000070",
              borderWidth: 1,
              borderColor: "#ffffff80",
              borderRadius: 24,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 100,
              }}>
              ↺
            </Text>
          </Pressable>
        </View>
      </Stagger>

      <Stagger initialEnteringDelay={2000} duration={500} style={{ marginTop: 32 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#ffffff90", fontSize: 14, textAlign: "center" }}>Made by </Text>
          <Pressable onPress={() => Linking.openURL("https://elkenzii.vercel.app")}>
            <Text style={{ color: "#ff9933", fontWeight: "bold" }}>Elkenzi</Text>
          </Pressable>
        </View>
        <Pressable>
          <Text style={{ color: "#ffffff90", fontSize: 14, textAlign: "center" }}>
            <Text style={{ color: "#ffffff90" }}>Join our </Text>
            <Text style={{ color: "#ff9933", fontWeight: "bold" }}>Robotics Community</Text>
          </Text>
        </Pressable>
      </Stagger>
    </View>
  );
}
