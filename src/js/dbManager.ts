import { Review, RestaurantScheme } from './restaurant';
import * as idb from './idb';

// TODO: remove any

export class DBManager
{

  private static readonly DATABASE_URL = 'http://localhost:1337/restaurants';
  private dbPromise: any;

  constructor()
  {
    this.refreshDB();
    this.dbPromise = idb.open('restaurantApp', 1, this.updateDBStructure);
  }

  private async refreshDB(): Promise<void>
  {
    (await this.fetchRestaurants()).forEach((restaurant: RestaurantScheme) =>  {
      this.dbPromise.then(db => {
        let dbRestaurant =
            db.transaction('restaurant', 'readwrite')
              .objectStore('restaurant');
        let reviews: Array<Review> = [];
        restaurant['reviews'].forEach((review: Review) => {
          review['restaurantId'] = restaurant['id'];
          reviews.push(review);
        });
        delete restaurant['reviews'];
        dbRestaurant.put(restaurant);
        let dbReview =
            db.transaction('review', 'readwrite').objectStore('review');
        for (let i in reviews) {
          dbReview.put(reviews[i]);
        }
      });
    });
  }

  private updateDBStructure(upgradeDB: any)
  {
    switch(upgradeDB.oldVersion) {
      case 0:
        let restaurantObject =
            upgradeDB.createObjectStore('restaurant', { keyPath: 'id' });
        restaurantObject.createIndex('id', 'id', { unique: false });
        let reviewObject =
            upgradeDB.createObjectStore(
                'review', { keyPath: 'rid', autoIncrement: true });
        reviewObject.createIndex(
            'restaurantId', 'restaurantId', { unique: false });
    }
  }

  private async fetchRestaurants(): Promise<Array<RestaurantScheme|void>>
  {
    return <Promise<Array<RestaurantScheme|void>>>new Promise(resolve => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', DBManager.DATABASE_URL);
      xhr.onload = () => {
        if (xhr.status === 200) { // Got a success response from server!
          const json = JSON.parse(xhr.responseText);
          resolve(this.checkForMissingPhotograph(json));
        } else {
          console.log(`
              Failed to connect to database! Failfurecode: Request failed.
              Returned status of ${xhr.status}`);
        }
        resolve([]);
      };
      xhr.send();
    });
  }

  private checkForMissingPhotograph(
      restaurants: Array<RestaurantScheme>): Array<RestaurantScheme>
  {
    restaurants.forEach((restaurant) => {
      if (!restaurant.photograph) {
        restaurant.photograph = restaurant.id.toString();
      }
      if (!restaurant.photograph.toString().match(/.*jpg/)) {
        restaurant.photograph += '.jpg';
      }

    });
    return restaurants;
  }

  public async getAllNeighborhoods(): Promise<Array<string>>
  {
    const restaurants = await this.getAllRestaurantDetails();
    let neighborhoods = [];
    restaurants.forEach(restaurant => {
      if (!neighborhoods.includes(restaurant.neighborhood)) {
        neighborhoods.push(restaurant.neighborhood);
      }
    });
    return neighborhoods;
  }

  public async getAllCuisines(): Promise<Array<string>>
  {
    const restaurants = await this.getAllRestaurantDetails();
    let cuisines: Array<string> = [];
    restaurants.forEach(restaurant => {
      if (!cuisines.includes(restaurant.cuisine_type)) {
        cuisines.push(restaurant.cuisine_type);
      }
    });
    return cuisines;
  }

  public async getRestaurantDetail(id: number): Promise<RestaurantScheme>
  {
    return new Promise<RestaurantScheme>(resolve => {
      this.dbPromise.then((db: any) => {
        db.transaction('restaurant')
          .objectStore('restaurant')
          .index('id')
          .get(id)
          .then((restaurant: RestaurantScheme) => {
            resolve(restaurant);
          });
      });
    });
  }

  public async getRestaurantsDetails(
      neighborhood: string, cuisines: string): Promise<Array<RestaurantScheme>>
  {
    const restaurants = await this.getAllRestaurantDetails();
    let choosenRestaurants: Array<RestaurantScheme> = [];
    restaurants.forEach(restaurant => {
      if ((restaurant.neighborhood == neighborhood || neighborhood == 'all')  &&
          (restaurant.cuisine_type == cuisines || cuisines == 'all')) {
        choosenRestaurants.push(restaurant);
      }
    });
    return choosenRestaurants;
  }

  private async getAllRestaurantDetails(): Promise<Array<RestaurantScheme>>
  {
    return new Promise<Array<RestaurantScheme>>(resolve => {
      this.dbPromise.then((db: any) => {
        db.transaction('restaurant')
          .objectStore('restaurant')
          .getAll()
          .then((restaurants: Array<RestaurantScheme>) => {
            resolve(restaurants);
          });
      });
    });
  }

  public async getReviewsByRestaurantId(id: number): Promise<Array<Review>>
  {
    return new Promise<Array<Review>>(resolve => {
      this.dbPromise.then((db: any) => {
        db.transaction('review')
          .objectStore('review')
          .index('restaurantId')
          .getAll(id)
          .then((reviews: Array<Review>) => {
            resolve(reviews);
          });
      });
    });
  }
}
