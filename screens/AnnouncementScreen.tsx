import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "../services/AnnouncementService";
import { View, Text, StyleSheet, Image } from "react-native";
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
            <Text style={{ fontSize: 24, fontWeight: "600" }}>{announcement?.carMake} {announcement?.carModel}</Text>
         </View>

         <View style={styles.rowTwo}>
            <Text style={{ fontSize: 19, fontWeight: "600",  }}>Informations :</Text>
            <Text style={styles.info}>Prix : {announcement?.price}</Text>
            <Text style={styles.info}>Année de fabrication : {announcement?.carModelYear}</Text>
         </View>
         
         <View style={styles.rowThree}>
            <Text style={styles.vendeurText}>Vendeur :</Text>
            <View style={styles.vendeurInfoContainer}>
               <View style={styles.avatarContainer}>
                     <Image source={{ uri: announcement?.avatar }} style={styles.avatar} />
               </View>
               <View style={styles.infoContainer}>
                     <Text style={styles.saler}>{announcement?.saler}</Text>
                     <View style={styles.infoRow}>
                        <Text style={styles.infoText}>Pays : {announcement?.country}</Text>
                        <Text style={styles.infoText}>Ville : {announcement?.city}</Text>
                        <Text style={styles.infoText}>Tél : {announcement?.phone}</Text>
                     </View>
               </View>
            </View>
         </View>

         <View style={styles.rowFour}>
            <Text style={{ fontSize: 19, fontWeight: "600" }}>Description :</Text>
            <Text>{announcement?.description}</Text>
         </View>

         <View style={styles.rowFive}>
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
      flex: 3,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
   },
   rowTwo: {
      flex: 3,
   },
   rowFour: {
      flex: 3,
   },
   rowFive: {
      flex: 3,
      justifyContent: "center",
      alignItems: "center",
   },
   info : {
      margin: 10
   },
   rowThree: {
      flex: 3,
       flexDirection: 'column',
       alignItems: 'flex-start',
   },
   vendeurText: {
       fontSize: 19,
       fontWeight: "600",
       marginBottom: 10,
   },
   vendeurInfoContainer: {
       flexDirection: 'row',
       alignItems: 'center',
   },
   avatarContainer: {
       marginRight: 3,
   },
   avatar: {
       width: 60, 
       height: 60, 
       borderRadius: 25, 
   },
   infoContainer: {
       flexDirection: 'column',
   },
   saler: {
       fontSize: 19,
       fontWeight: "600",
       marginBottom: 5,
   },
   infoRow: {
       flexDirection: 'row',
   },
   infoText: {
       marginRight: 10,
   },
});
