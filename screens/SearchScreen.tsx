import { View, StyleSheet, Text, TextInput } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import MyButton from "../components/Atoms/MyButton";
import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { RootStackParamList } from "../routes/RootStack";
import Announcement from "../models/Announcement";
import ListOfAnnouncement from "../components/ListOfAnnouncement";
import { useEffect, useState } from "react";

type Props =  StackScreenProps<RootStackParamList>;

function SearchScreen({ navigation }: Props) {

   const favoris = useSelector<GlobalStoreProps, Array<Announcement>>((state) => state.favori);

   const [carNumber, setCarNumber] = useState<number>(0);
   const [searchValue, setSearchValue] = useState<string>("");

   function navigateAnnouncementDetails(id:string) {
      navigation.navigate("Announcement", { announcementId: id });
   };

   const handleSearchChange = (text: string) => {
      console.log("changement recherche" + text)
      setSearchValue(text);
      console.log("Search Value : " + searchValue)
   };

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <MyButton title={`Mes favoris : ${favoris.length}`} pressed={() => {navigation.navigate('Favoris')}} color={'#43A047'} colorPress={'#2E7D32'} />
         </View>
         <View style={styles.rowTwo}>
         <TextInput 
               style={styles.input} 
               placeholder="Rechercher un véhicule" 
               value={searchValue}
               onChangeText={handleSearchChange}
            />
         </View>
         <View style={styles.rowThree}>
            <Text style={{marginLeft: 13, marginBottom: 5}}>Nombre d'annonces : <Text style={{fontStyle: 'italic'}}>{carNumber}</Text></Text>
            <ListOfAnnouncement navigateAnnouncementDetails={navigateAnnouncementDetails} input={searchValue} onUpdateCarNumber={(count) => setCarNumber(count)}/>
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
      flex: 2,
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
