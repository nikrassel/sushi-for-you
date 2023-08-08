import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: { name: "Все", id: 0 },
  allCategories: [
    { name: "Все", id: 0 },
    { name: "С лососем", id: 1 },
    { name: "С угрём", id: 2 },
    { name: "С креветкой", id: 3 },
    { name: "Запечёные", id: 4 },
    { name: "Наборы", id: 5 },
  ],
  activeType: {
    title: "алфавиту",
    property: "title",
  },
  allTypes: [
    { title: "популярности", property: "rating" },
    { title: "цене", property: "price" },
    { title: "алфавиту", property: "title" },
  ],
  sortOrder: "asc",
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    changeSortingType: (state, action) => {
      state.activeType = action.payload;
    },
    changeSortOrder: (state) => {
      if (state.sortOrder === "asc") {
        state.sortOrder = "desc";
      } else {
        state.sortOrder = "asc";
      }
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeSortingType,
  changeSortOrder,
  changePage,
} = filterSlice.actions;

export default filterSlice.reducer;