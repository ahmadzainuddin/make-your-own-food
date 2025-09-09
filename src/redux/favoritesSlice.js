import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Stores favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload; // Expecting the entire recipe object
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => item.idFood === recipe.idFood // Match by recipe id
      );
      if (existingIndex >= 0) {
        // Remove from favorites
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Add to favorites
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
