import { useRef } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const springAnim = useRef(new Animated.Value(0)).current;
  const bouncAnim = useRef(new Animated.Value(0)).current;

  const fadIn = () => {
    Animated.timing(fadeAnim, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const handleTrans = () => {
    Animated.timing(translateAnim, {
      toValue: 50,
      duration: 2000,
      easing: Easing.bezier(0.25, 0.25, 0.25, 1),
      useNativeDriver: true,
    }).start();
  };

  const handleScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 2000,
        easing: Easing.bezier(0.25, 0.25, 0.25, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 2,
        duration: 2000,
        easing: Easing.bezier(0.25, 0.25, 0.25, 1),
        useNativeDriver: true,
      }),
    ]).start();
  };
  const handleRotate = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bezier(0.25, 0.25, 0.25, 1),
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleSpring = () => {
    Animated.spring(springAnim, {
      friction: 5,
      tension: 100,
      toValue: 100,
      useNativeDriver: true,
    }).start(() => springAnim.setValue(0));
  };

  const handleBounce = () => {
    Animated.sequence([
      Animated.spring(bouncAnim, {
        friction: 5,
        tension: 100,
        toValue: 20,
        useNativeDriver: true,
      }),
      Animated.spring(bouncAnim, {
        friction: 5,
        tension: 100,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.conatiner}>
      <Text style={styles.header}>Basic Animation Demo</Text>
      {/* Fade In && Fade Out */}
      <View style={styles.demoContainer}>
        <Animated.View
          style={[styles.box, { opacity: fadeAnim }]}
        ></Animated.View>
        <View style={styles.btnContainer}>
          <Button title="Fade In" onPress={() => fadIn()} />
          <Button title="Fade Out" onPress={() => fadeOut()} />
        </View>
      </View>
      {/* End */}
      {/* Translate */}
      <View style={styles.demoContainer}>
        <Animated.View
          style={[styles.box, { transform: [{ translateX: translateAnim }] }]}
        ></Animated.View>
        <View
          style={[
            styles.btnContainer,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Button title="Translate" onPress={() => handleTrans()} />
        </View>
      </View>
      {/* End */}
      {/* Scale */}
      <View style={styles.demoContainer}>
        <Animated.View
          style={[styles.box, { transform: [{ scale: scaleAnim }] }]}
        ></Animated.View>
        <View
          style={[
            styles.btnContainer,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Button title="Scale" onPress={() => handleScale()} />
        </View>
      </View>
      {/* End */}
      {/* Rotate */}
      <View style={styles.demoContainer}>
        <Animated.View
          style={[styles.box, { transform: [{ rotate: spin }] }]}
        ></Animated.View>
        <View
          style={[
            styles.btnContainer,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Button title="Rotate" onPress={() => handleRotate()} />
        </View>
      </View>
      {/* End */}
      {/* spring */}
      <View style={styles.demoContainer}>
        <Animated.View
          style={[styles.box, { transform: [{ translateX: springAnim }] }]}
        ></Animated.View>
        <View
          style={[
            styles.btnContainer,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Button title="Spring" onPress={() => handleSpring()} />
        </View>
      </View>
      {/* End */}
      {/* bounce */}
      <View style={styles.demoContainer}>
        <Animated.View
          style={[styles.box, { transform: [{ translateY: bouncAnim }] }]}
        ></Animated.View>
        <View
          style={[
            styles.btnContainer,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Button title="Bounce" onPress={() => handleBounce()} />
        </View>
      </View>
      {/* End */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    paddingVertical: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  demoContainer: {
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around",
    gap: 20,
    width: 350,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "lightblue",
    alignSelf: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    elevation: 3,
    borderRadius: 5,
  },
});
