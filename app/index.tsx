import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  if (!products) {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size={"small"} color={"red"} />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      {products.map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          <Image
            style={styles.image}
            source={item.image}
            contentFit="contain"
            transition={1000}
          />
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price} numberOfLines={4}>
            ${item.price}
          </Text>
          <View style={styles.btnContainer}>
            <Pressable style={styles.cartBtn}>
              <Text style={styles.cart}>🛒</Text>
            </Pressable>
            <Pressable style={styles.buyBtn}>
              <Text style={styles.buy}>ყიდვა</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
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
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
});
