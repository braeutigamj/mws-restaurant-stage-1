import { Review, RestaurantScheme } from './restaurant';
import * as idb from './idb';

export class DBManager
{

  private static readonly DATABASE_URL =
      'https://pure-dusk-67754.herokuapp.com/';
  private dbPromise: any;

  constructor()
  {
    this.refreshDB();
    this.dbPromise = idb.open('restaurantApp', 3, this.updateDBStructure);
    this.retryPendingReviewRequests();
  }

  private async refreshDB(): Promise<void>
  {
    (await this.fetchRestaurants()).forEach((restaurant: RestaurantScheme) =>  {
      this.dbPromise.then(db => {
        let dbRestaurant =
            db.transaction('restaurant', 'readwrite')
              .objectStore('restaurant');

        this.fetchReviewsByRestaurant(restaurant['id']).then(reviews => {
          if (reviews) {
            this.clearDB('review', restaurant['id']);
            reviews.forEach(review => {
              review['restaurantId'] = restaurant['id'];
              db.transaction('review', 'readwrite')
                .objectStore('review')
                .put(review);
            });
          }
        });
        dbRestaurant.put(restaurant);
      });
    });
  }

  private clearDB(objectStoreName: string, restaurantId?: number): void
  {
    this.dbPromise.then(db => {
      const objectStore = db.transaction(objectStoreName, 'readwrite')
        .objectStore(objectStoreName);
      if (!restaurantId) {
        objectStore.clear();
        return;
      }
      let index = 'restaurantId';
      if (objectStoreName === 'restaurant') {
        index = 'id';
      }
      objectStore.index(index).getAllKeys(restaurantId).then(r => {
            objectStore.delete(r);
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
      case 1:
        let pendingReviewRequests =
            upgradeDB.createObjectStore(
                'pendingReviewRequests',
                { keyPath: 'pid', autoIncrement: true });
      case 2:
        let favourites = upgradeDB.createObjectStore('favourite');
    }
  }

  private async fetchRestaurants(): Promise<Array<RestaurantScheme|void>>
  {

    return this.fetchData(DBManager.DATABASE_URL + 'restaurants')
      .then(restaurants => {
        this.clearDB('restaurant');
        return this.checkForMissingPhotograph(restaurants);
      });
  }

  private async fetchReviewsByRestaurant(id: number
      ): Promise<Array<Review|void>>
  {
    return await
        this.fetchData(DBManager.DATABASE_URL + 'reviews/?restaurant_id=' + id);
  }

  private async fetchData(url: string
      ): Promise<Array<any>>
  {
    return <Promise<Array<any>>>
        new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onload = () => {
            if (xhr.status === 200) { // Got a success response from server!
              const json = JSON.parse(xhr.responseText);
              resolve(json);
            } else {
              reject();
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
            resolve(reviews.reverse());
          });
      });
    });
  }

  public addReviewByRestaurant(restaurantId: number, name: string,
      rating: number, comments: string): void
  {
    this.dbPromise.then(db => {
      db.transaction('review', 'readwrite')
        .objectStore('review')
        .put({
          'restaurantId': restaurantId,
          'restuarant_id': restaurantId,
          'name': name,
          'createdAt': Date.now(),
          'updatedAt': Date.now(),
          'rating': rating,
          'comments': comments
        });
    });

    this.sendReview({
      'restaurant_id': restaurantId,
      'name': name,
      'rating': rating,
      'comments': comments
    });
  }

  private sendReview(review: Object): void
  {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', DBManager.DATABASE_URL + 'reviews/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 &&
          (xhr.status !== <number>200 || xhr.status !== <number>201)) {
        this.addToPendingReviewRequests(review);
      }
    };
    xhr.onerror = () => {
      this.addToPendingReviewRequests(review);
    };
    xhr.send(JSON.stringify(review));
  }

  private addToPendingReviewRequests(review: Object): void
  {
    this.dbPromise.then(db => {
      db.transaction('pendingReviewRequests', 'readwrite')
        .objectStore('pendingReviewRequests')
        .put(review);
    });
  }

  private retryPendingReviewRequests(): void
  {
    this.dbPromise.then(db => {
      db.transaction('pendingReviewRequests')
        .objectStore('pendingReviewRequests')
        .getAll()
        .then(reviews => {
          db.transaction('pendingReviewRequests', 'readwrite')
            .objectStore('pendingReviewRequests')
            .clear();
          reviews.forEach(review => this.sendReview(review));
        });
    });
    window.setTimeout(this.retryPendingReviewRequests.bind(this), 3000);
  }

  public isFavouriteRestaurant(restaurantId: number): Promise<boolean>
  {
    return this.dbPromise.then(db => {
      return db.transaction('favourite')
        .objectStore('favourite')
        .get(restaurantId);
    });
  }

  public async changeFavouriteState(restaurantId: number): Promise<void>
  {
    await this.dbPromise.then(db => {
      return db.transaction('favourite')
        .objectStore('favourite')
        .get(restaurantId).then(r => {
          this.dbPromise.then(db => {
            if(r) {
              db.transaction('favourite', 'readwrite')
                .objectStore('favourite')
                .put(false, restaurantId);
            }
            else {
              db.transaction('favourite', 'readwrite')
                .objectStore('favourite')
                .put(true, restaurantId);
            }
          });
        });
    });
  }
}
