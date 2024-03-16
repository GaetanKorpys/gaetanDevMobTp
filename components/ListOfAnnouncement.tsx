import { ReactNode, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import DisplayError from "./DisplayError";
import { getAnnouncements } from "../services/AnnouncementService";
import Announcement from "../models/Announcement";
import ListItemAnnouncement from "./ListItemAnnouncement";

interface ListOfAnnouncementProps {
  navigateAnnouncementDetails: (id: string) => void;
  input: string;
  onUpdateCarNumber: (count: number) => void;
}

function ListOfAnnouncement({navigateAnnouncementDetails, input, onUpdateCarNumber}: ListOfAnnouncementProps): ReactNode {

  console.log("ListOfAnnouncement")

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [announcementsCopy, setAnnouncementsCopy] = useState<Array<Announcement>>([]);


  function searchCarFromInput(input: string): void {

    //const filteredAnnouncements = announcements.filter((announcement) =>
    // Objectif filtrer sur la liste originale
    // Permet de filtrer correctement si on supprime des champs de la searchBar (fonctionne bien)
    // Cependant ne filtre rien au départ au chargement ou si on tape dans la searchBar
    // Pas eu le temps de fix
    const filteredAnnouncements = announcements.filter((announcement) =>
      announcement.carMake.toLowerCase().includes(input.toLowerCase()) ||
      announcement.carModel.toLowerCase().includes(input.toLowerCase())
    );

    onUpdateCarNumber(filteredAnnouncements.length);
    setAnnouncements(filteredAnnouncements);
  }

  async function fetchAnnouncement(): Promise<void> {
    try {
      const announcements = await getAnnouncements();
      setAnnouncements(announcements);
      setIsLoading(false);

      onUpdateCarNumber(announcements.length);
    } catch (error) {
      // TODO error handling
      setIsError(true)
    }
  }
  
  useEffect(() => {
    void fetchAnnouncement()
    setAnnouncementsCopy(announcements);
  }, [])

  useEffect(() => {
    console.log("Liste : " + input)
    searchCarFromInput(input);
  }, [input]);

  if(isLoading)
    return <Text>Chargement en cours ...</Text>

  return (
    <View style={styles.container}>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les annonces' />) :
          (<FlatList
            data={announcements}
            renderItem={({ item }) => (
              <ListItemAnnouncement
                announcement={item}
                onClick={() => navigateAnnouncementDetails(item.id)}
              />
            )}
          />)
      }
    </View>
  );
}

export default ListOfAnnouncement;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

