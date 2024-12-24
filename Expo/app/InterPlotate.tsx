import { Animated, Button, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

const index = () => {
  const startAnim = useRef(new Animated.Value(0)).current;
  const handleStartAnim = () => {
    Animated.timing(startAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const colorInter = startAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["red", "yellow"],
  });
  const rotateInter = startAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>InterPloted Anim</Text>
      <View>
        <Animated.View
          style={[
            styles.boxContainer,
            {
              backgroundColor: colorInter,
              transform: [{ rotate: rotateInter }],
            },
          ]}
        ></Animated.View>
        <Button title="interplote" onPress={() => handleStartAnim()} />
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
    marginBottom: 20,
  },
  boxContainer: {
    width: 200,
    height: 200,
    backgroundColor: "green",
    marginBottom: 20,
  },
});
