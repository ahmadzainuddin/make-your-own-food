import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    const newRecipe = { title, image, description };

    try {
      const existingRecipes = await AsyncStorage.getItem("customRecipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      if (recipeToEdit !== undefined && recipeIndex !== undefined) {
        // Editing existing recipe
        recipes[recipeIndex] = newRecipe;
      } else {
        // Adding new recipe
        recipes.push(newRecipe);
      }

      await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#fff",
  },
  input: {
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(2),
    borderRadius: 5,
    fontSize: hp(2),
  },
  image: {
    width: "100%",
    height: hp(25),
    marginVertical: hp(2),
    borderRadius: 8,
  },
  imagePlaceholder: {
    height: hp(20),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: hp(2),
    color: "#6B7280",
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(3),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: hp(2.2),
  },
});
