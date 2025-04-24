import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { FACTOR, ThemedText } from "@/components/ThemedText";
import Header from "@/components/ui/Header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@/hooks/useThemeColor";
import Content from "@/components/ui/Content";
import { FloatingButton } from "@/components/ui/Button";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Index() {
  const text = useThemeColor({}, "text");
  const brand = useThemeColor({}, "spotifyGreen");
  const background = useThemeColor({}, "background");

  return (
    <ThemedView style={styles.container}>
      <Header
        leftComponent={<AntDesign name="arrowleft" size={24} />}
        rightComponent={
          <View
            style={{
              alignItems: "center",
              padding: 2,
              backgroundColor: text + "18",
              borderRadius: 50,
            }}
          >
            <ThemedText style={styles.text}>Skip</ThemedText>
          </View>
        }
        titleComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemedText type="subtitle">
              Connection <Text>{"\u2014"} </Text>
            </ThemedText>
            <ThemedText type="subtitle" style={{ opacity: 0.4 }}>
              2 of 3
            </ThemedText>
          </View>
        }
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          // backgroundColor: "red",
        }}
      >
        <Content
          title="Connect to Wi-Fi"
          titleComponent={
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <ThemedText type="title" style={{ width: "100%" }}>
                Connect Your
              </ThemedText>
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: text + "40",
                  borderWidth: 2.5,
                  borderColor: text + "40",
                  overflow: "hidden",
                }}
              >
                <BrandLogo
                  size={42 + FACTOR}
                  style={{
                    backgroundColor: text,
                    transform: [{ rotate: "-15deg" }, { scale: 1.04 }],
                  }}
                />
              </View>
              <ThemedText
                type="title"
                style={{
                  marginLeft: 8,
                }}
              >
                Spotify
              </ThemedText>
            </View>
          }
          description="Link your Spotify to track your favorite artists and get concert recommendations tailored to your listening."
        />
      </View>
      <FloatingButton
        right={20}
        style={{
          backgroundColor: text,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
        textComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingVertical: 2,
            }}
          >
            <BrandLogo size={24} />
            <ThemedText
              style={{ color: brand, fontSize: 16, lineHeight: 20 }}
              type="title"
            >
              Connect Spotify
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    paddingHorizontal: 12,
  },
});
