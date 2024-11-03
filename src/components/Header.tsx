import { View, Pressable, Text } from "react-native";
import { headerStyles as styles } from "@/styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Coins, Download, Share2, X } from "lucide-react-native";
export default function WelcomeScreen({ credits }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>StoryPix</Text>
      </View>

      {credits !== null && credits !== undefined ? (
        <View style={styles.title}>
          <View className="flex-row gap-1 items-center">
            <Coins size={20} color={"#d55021"} />
            <Text style={styles.creditsValue}>{credits}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.title}>
          <FontAwesome6 name="bars-staggered" size={24} color="#d55021" />
        </View>
      )}
    </View>
  );
}
