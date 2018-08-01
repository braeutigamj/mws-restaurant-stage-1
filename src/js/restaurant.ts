import { DBManager } from './dbManager';

declare function addMarkersToMap(restaurants: Array<RestaurantScheme>): void

export interface LatLng {
  lat: number,
  lng: number,
}

export interface OperatingHours {
  Monday: string,
  Tuesday: string,
  Wednesday: string,
  Thursday: string,
  Friday: string,
  Saturday: string,
  Sunday: string
}

export interface Review {
  [key:string]: any
  name: string,
  date: string,
  rating: number,
  comments: string,
}

export interface RestaurantScheme {
  [key:string]: any
  name: string,
  neighborhood: string,
  address: string,
  latlng: LatLng,
  cuisine_type: string,
  operating_hours: OperatingHours,
  createdAt: string,
  updatedAt: string,
  id: number
  photograph?: string
  reviews?: Array<Review>
}

export class Restaurant
{
  private dbManager: DBManager;
  private restaurant: RestaurantScheme;

  constructor()
  {
    this.dbManager = new DBManager();
    this.loadRestaurant();
  }

  private async loadRestaurant(): Promise<void>
  {
    const id = parseInt(this.getParameterByName('id'), 10);
    if (!id) { // no id found in URL
      console.error('No restaurant id in URL');
      return;
    }
    this.restaurant = await this.dbManager.getRestaurantDetail(id);
    addMarkersToMap([this.restaurant]);
    this.fillRestaurantHTML();
    this.fillBreadcrumb();
  }

  private getParameterByName(name: string, url?: string): string
  {
    if (!url)
      url = location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
      results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  private async fillRestaurantHTML(): Promise<void>
  {
    const name = document.getElementById('restaurant-name');
    name.innerHTML = this.restaurant.name;

    const address = document.getElementById('restaurant-address');
    address.innerHTML = this.restaurant.address;

    const image = <HTMLImageElement>document.getElementById('restaurant-img');
    image.className = 'restaurant-img'
    image.src = `/img/${this.restaurant.photograph}`;
    image.srcset = Restaurant.getRestaurantSrcset(this.restaurant.photograph);
    image.alt = 'photograph of ' + this.restaurant.name;

    const cuisine = document.getElementById('restaurant-cuisine');
    cuisine.innerHTML = this.restaurant.cuisine_type;

    // fill operating hours
    if (this.restaurant.operating_hours) {
      this.fillRestaurantHoursHTML();
    }
    // fill reviews
    this.fillReviewsHTML();
  }

  private fillRestaurantHoursHTML(): void
  {
    const hours = document.getElementById('restaurant-hours');
    for (let key in this.restaurant.operating_hours) {
      const row = document.createElement('tr');

      const day = document.createElement('td');
      day.innerHTML = key;
      row.appendChild(day);

      const time = document.createElement('td');
      time.innerHTML = this.restaurant.operating_hours[key];
      row.appendChild(time);

      hours.appendChild(row);
    }
  }

  private async fillReviewsHTML(): Promise<void>
  {
    const container = document.getElementById('reviews-container');
    const title = document.createElement('h3');
    title.setAttribute('tabindex', '0');
    title.innerHTML = 'Reviews';
    container.appendChild(title);

    const reviews =
        await this.dbManager.getReviewsByRestaurantId(this.restaurant.id);
    if (!reviews.length) {
      const noReviews = document.createElement('p');
      noReviews.innerHTML = 'No reviews yet!';
      container.appendChild(noReviews);
      return;
    }
    const ul = document.getElementById('reviews-list');
    reviews.forEach(review => {
      ul.appendChild(this.createReviewHTML(review));
    });
    container.appendChild(ul);
  }

  private createReviewHTML(review: Review): HTMLElement
  {
    const li = document.createElement('li');
    const reviewHead = document.createElement('div');
    reviewHead.classList.add('review-head');

    const name = document.createElement('span');
    name.classList.add('review-name');
    name.innerHTML = review.name;
    reviewHead.appendChild(name);

    const date = document.createElement('span');
    date.classList.add('review-date');
    date.innerHTML = review.date;
    reviewHead.appendChild(date);

    li.appendChild(reviewHead);

    const rating = document.createElement('p');
    rating.classList.add('review-rating');
    rating.innerHTML = `Rating: ${review.rating}`;
    li.appendChild(rating);

    const comments = document.createElement('p');
    comments.innerHTML = review.comments;
    li.appendChild(comments);

    return li;
  }

  public fillBreadcrumb(): void
  {
    const breadcrumb = document.querySelector('#breadcrumb ul');
    const li = document.createElement('li');
    const currentPage = document.createElement('a');
    currentPage.innerHTML = this.restaurant.name;
    currentPage.setAttribute('aria-current', 'page');
    currentPage.href = '#';
    li.appendChild(currentPage);
    breadcrumb.appendChild(li);
  }

  public static getRestaurantSrcset(image: string): string
  {
    let srcset = '';
    [200, 300, 600].forEach(size => {
      srcset += `/img/${size}/${image} ${size}w,`;
    });
    return (srcset.slice(0, -1));
  }

  public static urlForRestaurant(restaurant: RestaurantScheme): string
  {
    return `./restaurant.html?id=${restaurant.id}`;
  }
}