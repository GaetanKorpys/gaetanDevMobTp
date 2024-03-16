import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import Announcement from "../models/Announcement";
import ListItemAnnouncement from "../components/ListItemAnnouncement";


type Props =  StackScreenProps<RootStackParamList>;

function FavorisScreen({ navigation }: Props) {
   const favoris = useSelector<GlobalStoreProps, Array<Announcement>>((state) => state.favori);

   function navigateAnnouncementDetails(id:string) {
      navigation.navigate("Announcement", { announcementId: id });
   };
  


   if (favoris.length === 0) {
      return (
         <View style={styles.container}>
            <Text>Vous ne possèdez aucun favoris</Text>
         </View>
      );
   }
   return (
      <View style={styles.container}>
         <FlatList
            data={favoris}
            renderItem={({ item }) => (
              <ListItemAnnouncement
                announcement={item}
                onClick={() => navigateAnnouncementDetails(item.id)}
              />
            )}
          />
      </View>
   );
}

export default FavorisScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
