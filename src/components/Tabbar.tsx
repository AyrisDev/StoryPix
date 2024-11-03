// components/TabBar.tsx
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter, useSegments } from "expo-router";
import { Home, User, Images } from "lucide-react-native";

export default function TabBar() {
  const router = useRouter();
  const segments = useSegments();

  const tabs = [
    {
      name: "index",
      icon: Home,
      label: "Home",
      path: "/(tabs)",
      focus: "(tabs)",
    },
    {
      name: "gallery",
      icon: Images,
      label: "Gallery",
      path: "/gallery",
      focus: "gallery",
    },
    {
      name: "profile",
      icon: User,
      label: "Profile",
      path: "/profile",
      focus: "profile",
    },
  ];

  if (segments[0] === "(auth)") {
    return null;
  }
  // Current tab'i kontrol et
  const currentTab = segments[segments.length - 1];

  return (
    <BlurView intensity={50} style={styles.container}>
      <View style={styles.tabBarContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon; // pathname ile tab kontrolü
          const isFocused = tab.focus === currentTab;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, isFocused && styles.tabFocused]}
              onPress={() => router.push(tab.path)}
            >
              <Icon
                size={20}
                color={isFocused ? "#000" : "#f6d0b2"}
                style={styles.icon}
              />
              {isFocused && <Text style={styles.label}>{tab.label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    fontFamily: "Oxanium-Regular",
  },
  tabBarWrapper: {
    marginTop: 10,
    marginBottom: Platform.OS === "ios" ? 0 : 10,
  },
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#e9874e",
    borderRadius: 25,
    padding: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
    fontFamily: "Oxanium-Regular",
  },
  tabFocused: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontFamily: "Oxanium-Regular",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    fontFamily: "Oxanium-Regular",
  },
  icon: {
    marginRight: 0,
  },
  iconFocused: {
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
    fontFamily: "Oxanium-Regular",
    marginTop: 4,
  },
});
