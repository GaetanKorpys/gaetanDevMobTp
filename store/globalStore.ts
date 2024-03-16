import { configureStore } from "@reduxjs/toolkit";
import favoriReducer from "../reducers/favoriReducer";
import Announcement from "../models/Announcement";

const globalStore = configureStore({
   reducer: {
      favori: favoriReducer
   }
});

export interface GlobalStoreProps {
   favori: Array<Announcement>;
}

export default globalStore;
