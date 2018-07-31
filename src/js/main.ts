import { DBManager} from './dbManager';
import { Restaurant, RestaurantScheme } from './restaurant';

declare function addMarkersToMap(restaurants: Array<RestaurantScheme>): void
declare function removeMarkersFromMap(): void

export class Main
{
  private dbManager: DBManager;
  private markers: any;

  constructor()
  {
    this.dbManager = new DBManager();
    this.fillNeighborhoodsHTML();
    this.fillCuisinesHTML();
    this.fillRestaurantsHTML();
  }

  private async fillNeighborhoodsHTML(): Promise<void>
  {
    const select = document.getElementById('neighborhoods-select');
    (await this.dbManager.getAllNeighborhoods()).forEach(neighborhood => {
      const option = document.createElement('option');
      option.innerHTML = neighborhood;
      option.value = neighborhood;
      select.appendChild(option);
    });
    document.getElementById('neighborhoods-select')
      .addEventListener('change', () => {
        this.fillRestaurantsHTML();
      });
  }

  private async fillCuisinesHTML(): Promise<void>
  {
    const select = document.getElementById('cuisines-select');
    select.setAttribute('aria-label', 'Select Cuisines');
    (await this.dbManager.getAllCuisines()).forEach(cuisine => {
      const option = document.createElement('option');
      option.innerHTML = cuisine;
      option.value = cuisine;
      select.appendChild(option);
    });
    document.getElementById('cuisines-select')
      .addEventListener('change', () => {
        this.fillRestaurantsHTML();
      });
  }

  private async fillRestaurantsHTML(): Promise<void>
  {
    const neighborhoodsSelect =
        <HTMLSelectElement>document.getElementById('neighborhoods-select');
    const neighborhood =
        neighborhoodsSelect.options[neighborhoodsSelect.selectedIndex].value;
    const cuisineSelect =
        <HTMLSelectElement>document.getElementById('cuisines-select');
    const cuisine = cuisineSelect.options[cuisineSelect.selectedIndex].value;
    const restaurants =
        await this.dbManager.getRestaurantsDetails(neighborhood, cuisine);

    this.resetRestaurants();
    const ul = document.getElementById('restaurants-list');
    restaurants.forEach(restaurant => {
      ul.appendChild(this.createRestaurantHTML(restaurant));
    });
    addMarkersToMap(restaurants);
  }

  private resetRestaurants(): void
  {
    const ul = document.getElementById('restaurants-list');
    ul.innerHTML = '';
    removeMarkersFromMap();
  }

  private createRestaurantHTML(restaurant: RestaurantScheme): any
  {
    const li = <any>(document.createElement('li'));

    const image = document.createElement('img');
    image.className = 'restaurant-img';
    image.alt = 'photograph of ' + restaurant.name;
    image.src = `/img/${restaurant.photograph}`;
    image.srcset = Restaurant.getRestaurantSrcset(restaurant.photograph);
    li.appendChild(image);
    const name = document.createElement('h2');
    name.innerHTML = restaurant.name;
    name.setAttribute('tabindex', '0');
    li.appendChild(name);

    const neighborhood = document.createElement('p');
    neighborhood.innerHTML = restaurant.neighborhood;
    li.appendChild(neighborhood);

    const address = document.createElement('p');
    address.innerHTML = restaurant.address;
    li.appendChild(address);

    const more = document.createElement('a');
    more.setAttribute('aria-label', restaurant.name);
    more.innerHTML = 'View Details';
    more.href = this.urlForRestaurant(restaurant);
    li.appendChild(more)

    return li
  }

  public urlForRestaurant(restaurant: RestaurantScheme): string
  {
    return Restaurant.urlForRestaurant(restaurant);
  }

}
