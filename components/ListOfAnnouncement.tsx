import { ReactNode, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import DisplayError from "./DisplayError";
import { getAnnouncements } from "../services/AnnouncementService";
import Announcement from "../models/Announcement";
import ListItemAnnouncement from "./ListItemAnnouncement";

interface ListOfAnnouncementProps {
  navigateAnnouncementDetails: (id: string) => void
}

function ListOfAnnouncement({navigateAnnouncementDetails}: ListOfAnnouncementProps): ReactNode {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);

  async function fetchMovie(): Promise<void> {
    try {
      const announcements = await getAnnouncements();
      setAnnouncements(announcements);
      setIsLoading(false);
    } catch (error) {
      // TODO error handling
      setIsError(true)
    }
  }
  
  useEffect(() => {
    void fetchMovie()
  }, [])

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
