import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const animRef = useAnimatedRef<Animated.View>();

  const opacity = useDerivedValue(() => {
    return Math.sin((rotation.value * Math.PI) / 180) / 2 + 0.5;
  });

  const styleBox = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
        {
          rotate: `${rotation.value}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 1 / scale.value,
        },
      ],
    };
  });

  const handleStartanimation = () => {
    offset.value = withSpring(Math.random() * 200 - 100);
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
    scale.value = withRepeat(
      withTiming(1.5, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );
  };

  const handleStopAnimation = () => {
    cancelAnimation(offset);
    cancelAnimation(rotation);
    cancelAnimation(scale);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>InterPloted Anim</Text>
      <Animated.View ref={animRef} style={[styles.box, styleBox]}>
        <Animated.Text
          style={[
            { fontSize: 18, fontWeight: "bold", textAlign: "center" },
            textStyle,
          ]}
        >
          InterPloted Now
        </Animated.Text>
      </Animated.View>
      <View style={styles.btContainer}>
        <Pressable onPress={handleStartanimation}>
          <Text style={styles.btnText}>Start Animation</Text>
        </Pressable>
      </View>
      <View style={styles.btContainer}>
        <Pressable onPress={handleStopAnimation}>
          <Text style={styles.btnText}>Stop Animation</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 1,
    marginBottom: 40,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "gold",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btContainer: {
    backgroundColor: "blue",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
