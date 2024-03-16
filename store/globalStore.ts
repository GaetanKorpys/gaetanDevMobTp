import { configureStore } from "@reduxjs/toolkit";
import favoriReducer from "../reducers/favoriReducer";
import Movie from "../models/Announcement";

const globalStore = configureStore({
   reducer: {
      favori: favoriReducer
   }
});

export interface GlobalStoreProps {
   favori: Array<Movie>;
}

export default globalStore;
