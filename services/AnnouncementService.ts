import Announcement from "../models/Announcement";

export async function getAnnouncements(): Promise<Array<Announcement>> {
  try {
    const res: Array<Announcement> = [];

    //const f1 = require('../helpers/PopularMovies_p1.json');
    //const f2 = require('../helpers/PopularMovies_p2.json');
    const f3 = require('../helpers/data.json');

    //const response = [...(f1.results), ...(f2.results)] 

    const response = f3;

    response.map((value: any) => {
      res.push(
        {
          id: value.id,
          carMake: value.carMake,
          carModel: value.carModel,
          carModelYear: value.carModelYear,
          description: value.description,
          saler: value.saler,
          price:  value.price,
          city: value.city,
          country : value.country,
          phone: value.phone,
        }
      )
    });
    return res;
  } catch (error: any) {
    console.log(`Error with function getAnnouncement ${error.message}`);
    throw error;
  }
};

export async function getAnnouncementById(id: string): Promise<Announcement | undefined> {
  try {
    const list: Array<Announcement> = [];

    //const f1 = require('../helpers/PopularMovies_p1.json');
    //const f2 = require('../helpers/PopularMovies_p2.json');

    //const response = [...(f1.results), ...(f2.results)] 

    const f3 = require('../helpers/data.json');

    const response = f3;

    response.map((value: any) => {
      list.push(
        {
          id: value.id,
          carMake: value.carMake,
          carModel: value.carModel,
          carModelYear: value.carModelYear,
          description: value.description,
          saler: value.saler,
          price:  value.price,
          city: value.city,
          country : value.country,
          phone: value.phone,
        }
      )
    });
    return list.find((m) => m.id === id);
  } catch (error: any) {
    console.log(`Error with function getAnnouncementById ${error.message}`);
    throw error;
  }
};
