import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import MyButton from "../components/Atoms/MyButton";
import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { RootStackParamList } from "../routes/RootStack";
import Announcement from "../models/Announcement";
import ListOfAnnouncement from "../components/ListOfAnnouncement";

type Props =  StackScreenProps<RootStackParamList>;

function SearchScreen({ navigation }: Props) {

   const favoris = useSelector<GlobalStoreProps, Array<Announcement>>((state) => state.favori);

   function navigateAnnouncementDetails(id:string) {
      navigation.navigate("Announcement", { announcementId: id });
   };
  

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <MyButton title={`Mes favoris : ${favoris.length}`} pressed={() => {navigation.navigate('Favoris')}} color={'#43A047'} colorPress={'#2E7D32'} />
         </View>
         <View style={styles.rowTwo}>
            <ListOfAnnouncement navigateAnnouncementDetails={navigateAnnouncementDetails} />
         </View>
      </View>
   );
}

export default SearchScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 8
   },
   rowOne: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   rowTwo: {
      flex: 10,
   },
});
