import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "../services/AnnouncementService";
import { View, Text, StyleSheet } from "react-native";
import MyButton from "../components/Atoms/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { addFavori, removeFavori } from "../reducers/favoriReducer";
import DisplayError from "../components/DisplayError";
import Announcement from "../models/Announcement";
import { RootStackParamList } from "../routes/RootStack";

type AnnouncementScreenParams = {}

type AnnouncementScreenProps = AnnouncementScreenParams & StackScreenProps<RootStackParamList, 'Announcement'>

function AnnouncementScreen({ navigation, route }: AnnouncementScreenProps) {
   const favoris = useSelector<GlobalStoreProps, Array<Announcement>>((state) => state.favori);
   const [announcement, setAnnouncement] = useState<Announcement>();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [onError, setOnError] = useState<boolean>(false);

   const dispatch = useDispatch();

   useEffect(() => {
      async function getAnnouncement(): Promise<void> {
         try {
            const announcement = await getAnnouncementById(route.params.announcementId);
            if (announcement == null) {
               throw new Error("404 not found")
            }
            setAnnouncement(announcement);
         } catch (e) {
            setOnError(true);
         }
         setIsLoading(false);
      }
      void getAnnouncement();
   }, []);

   if(announcement == null) {
      return <DisplayError message={"Erreur dans le chargment de l'annonce"}></DisplayError>
   }

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <Text style={{ fontSize: 24, fontWeight: "600" }}>{announcement?.carMake}</Text>
         </View>
         <View style={styles.rowTwo}>
            <Text style={{ fontSize: 12 }}>More and more details ... .</Text>
         </View>
         <View style={styles.rowThree}>
            {favoris.find(m => m.id === announcement?.id) == null ?
               (
                  <MyButton title={"Ajouter au favoris"} pressed={() => dispatch(addFavori(announcement))} color={'#43A047'} colorPress={'#2E7D32'} />
               ) : (
                  <MyButton title={"Supprimer des favoris"} pressed={() => dispatch(removeFavori(announcement))} color={'#43A047'} colorPress={'#2E7D32'} />
               )}
         </View>
      </View>
   );
}

export default AnnouncementScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   rowOne: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
   },
   rowTwo: {
      flex: 4,
   },
   rowThree: {
      flex: 4,
      justifyContent: "center",
      alignItems: "center",
   }
});
