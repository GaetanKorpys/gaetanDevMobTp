import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Movie from "../models/Announcement";
import Colors from "../constants/Colors";
import Announcement from "../models/Announcement";

type ListItemAnnouncementParams = {
  announcement: Announcement
  onClick : () => void
}

const ListItemAnnouncement = ({ announcement, onClick }: ListItemAnnouncementParams) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {announcement.carMake} {announcement.carModel}
          </Text>
        </View>
        <View>
          <Text style={styles.cuisine}>{announcement.carModelYear}</Text>
        </View>
        <View>
          <Text>{announcement.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItemAnnouncement;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});