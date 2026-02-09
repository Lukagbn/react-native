import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type productsType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "men's clothing" | "jewelery" | "electronics" | "women's clothing";
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function old_Index() {
  const [products, setProducts] = useState<productsType[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const result = await res.json();
      setProducts(result);
    } catch (error) {
      console.log(`this is error: ${error}`);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  if (!products) {
    return (
      <SafeAreaView>
        <StatusBar style="dark" />
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <FlatList
        contentContainerStyle={styles.container}
        data={products}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        initialNumToRender={3}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.itemWrapper}>
            <View>
              <Image
                style={styles.image}
                source={item.image}
                contentFit="contain"
                transition={1000}
              />
              <View style={styles.btnWrapper}>
                <Pressable
                  onPress={() => {
                    console.log("pressed");
                  }}
                  style={({ pressed }) => [
                    styles.compareBtn,
                    pressed && styles.cartBtnPressed,
                  ]}
                >
                  <Text style={styles.cart}>
                    <Ionicons
                      name="git-compare-outline"
                      size={24}
                      color="black"
                    />
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    console.log("pressed");
                  }}
                  style={({ pressed }) => [
                    styles.cartBtn,
                    pressed && styles.cartBtnPressed,
                  ]}
                >
                  <Text style={styles.cart}>
                    <Entypo name="heart-outlined" size={24} color="black" />
                  </Text>
                </Pressable>
              </View>
              <Image source={"../assets/images/cart.svg"} />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price} numberOfLines={4}>
              ${item.price}
            </Text>
            <View style={styles.btnContainer}>
              <Pressable
                onPress={() => {
                  console.log("pressed");
                }}
                style={({ pressed }) => [
                  styles.cartBtn,
                  pressed && styles.cartBtnPressed,
                ]}
              >
                <Text style={styles.cart}>
                  <AntDesign name="shopping-cart" size={24} color="black" />
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  console.log("pressed");
                  setModalVisible(!modalVisible);
                }}
                style={({ pressed }) => [
                  styles.buyBtn,
                  pressed && styles.cartBtnPressed,
                ]}
              >
                <Text style={styles.buy}>ყიდვა</Text>
              </Pressable>
            </View>
          </View>
        )}
      ></FlatList>
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text>Modal content</Text>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 500,
  },
  container: {
    backgroundColor: "#ffff",
    paddingBottom: 50,
    paddingTop: 50,
  },
  title: {
    fontWeight: 700,
    marginVertical: 10,
    fontSize: 22,
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 80,
    marginVertical: 20,
    borderRadius: 22,
    padding: 18,
    position: "relative",
    backgroundColor: "#faf8f872",
  },
  image: {
    height: 140,
    marginVertical: 8,
  },
  price: {
    fontWeight: 700,
    fontSize: 25,
  },
  btnContainer: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  cartBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",

    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  cart: {
    fontSize: 20,
  },
  buyBtn: {
    height: 50,
    borderRadius: 30,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ae00ff",

    // iOS shadow
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  buy: {
    fontWeight: 700,
    color: "#ffff",
  },
  btnWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "column",
    gap: 10,
  },
  compareBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",

    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,

    // Android shadow
    elevation: 10,
  },
  compareImg: {
    width: 24,
    height: 24,
  },
  cartBtnPressed: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
    transform: [{ scale: 0.95 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "50%",
    height: "30%",
    backgroundColor: "#ffff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
