import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {products.map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          <Image
            style={styles.image}
            source={item.image}
            contentFit="contain"
            transition={1000}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={4}>{item.description}</Text>
          <Button title="details" />
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    marginVertical: 10,
  },
  itemWrapper: {
    borderWidth: 1,
    margin: 16,
    borderRadius: 15,
    padding: 14,
  },
  image: {
    height: 140,
    marginVertical: 10,
  },
});
