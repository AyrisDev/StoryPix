import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import {
  Archive,
  Globe,
  HelpCircle,
  Receipt,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react-native";
import Header from "@/components/Header";
export default function ProfileScreen() {
  const menuItems = [
    {
      icon: Receipt,
      title: "Buy Credits",
      onPress: () => router.push("/invoices"),
    },
    {
      icon: Archive,
      title: "Prompt Archive",
      onPress: () => router.push(""),
    },
    {
      icon: Globe,
      title: "Language",
      value: "English",
      onPress: () => router.push(""),
    },
    {
      icon: LogOut,
      title: "LogOut",
      onPress: () => router.push("/help"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#fdf6ef]">
      <Header />

      <View style={styles.profileCard}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>StoryPix</Text>
          <Text style={styles.userHandle}>@ayris.tech</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Pressable
              key={item.title}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem,
              ]}
            >
              <View style={styles.menuItemLeft}>
                <Icon size={20} color="#666" style={styles.menuIcon} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && (
                  <Text style={styles.menuValue}>{item.value}</Text>
                )}
                <ChevronRight size={20} color="#CCC" />
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6ef",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  profileCard: {
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuValue: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerLink: {
    color: "#666",
    fontSize: 14,
  },
  footerDot: {
    color: "#666",
    marginHorizontal: 8,
  },
  version: {
    position: "absolute",
    right: 20,
    color: "#666",
    fontSize: 14,
  },
});
