import { View, StyleSheet, Text, TextInput } from "react-native";
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
            <TextInput style={styles.input} placeholder="Rechercher un véhicule" />
         </View>
         <View style={styles.rowThree}>
            <Text style={{marginLeft: 13, marginBottom: 5}}>Nombre d'annonces : </Text>
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
      flex: 1,
      marginVertical: 15,
   },
   rowThree: {
      flex: 10,
   },
   input: {
      width: "80%",
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: "#f5f5f5",
      borderRadius: 20,
      borderColor: "#ccc",
      borderWidth: 1,
      marginLeft: 10,
   },
});
