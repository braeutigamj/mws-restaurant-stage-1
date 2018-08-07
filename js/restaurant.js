(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Restaurant"] = factory();
	else
		root["Restaurant"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Restaurant", function() { return Restaurant; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dbManager__ = __webpack_require__(1);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var Restaurant = /** @class */ (function () {
    function Restaurant() {
        this.dbManager = new __WEBPACK_IMPORTED_MODULE_0__dbManager__["a" /* DBManager */]();
        this.loadRestaurant();
    }
    Restaurant.prototype.loadRestaurant = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = parseInt(this.getParameterByName('id'), 10);
                        if (!id) { // no id found in URL
                            console.error('No restaurant id in URL');
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.dbManager.getRestaurantDetail(id)];
                    case 1:
                        _a.restaurant = _b.sent();
                        addMarkersToMap([this.restaurant]);
                        this.fillRestaurantHTML();
                        this.fillBreadcrumb();
                        return [2 /*return*/];
                }
            });
        });
    };
    Restaurant.prototype.getParameterByName = function (name, url) {
        if (!url)
            url = location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    Restaurant.prototype.fillRestaurantHTML = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, _a, _b, address, image, cuisine;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = document.getElementById('restaurant-name');
                        _a = name;
                        _b = this.restaurant.name;
                        return [4 /*yield*/, this.getFavouriteStar()];
                    case 1:
                        _a.innerHTML = _b + (_c.sent());
                        name.addEventListener('click', this.changeFavouriteState.bind(this));
                        address = document.getElementById('restaurant-address');
                        address.innerHTML = this.restaurant.address;
                        image = document.getElementById('restaurant-img');
                        image.className = 'restaurant-img';
                        image.src = "/img/" + this.restaurant.photograph;
                        image.srcset = Restaurant.getRestaurantSrcset(this.restaurant.photograph);
                        image.alt = 'photograph of ' + this.restaurant.name;
                        cuisine = document.getElementById('restaurant-cuisine');
                        cuisine.innerHTML = this.restaurant.cuisine_type;
                        // fill operating hours
                        if (this.restaurant.operating_hours) {
                            this.fillRestaurantHoursHTML();
                        }
                        // fill reviews
                        this.fillReviewsHTML();
                        return [2 /*return*/];
                }
            });
        });
    };
    Restaurant.prototype.changeFavouriteState = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbManager.changeFavouriteState(this.restaurant.id)];
                    case 1:
                        _a.sent();
                        this.fillRestaurantHTML();
                        return [2 /*return*/];
                }
            });
        });
    };
    Restaurant.prototype.getFavouriteStar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnString = ' <a href="#" id="favourite" aria-label="';
                        return [4 /*yield*/, this.dbManager.isFavouriteRestaurant(this.restaurant.id)];
                    case 1:
                        if (_a.sent()) {
                            returnString += 'unset favourite"> &#9733;';
                        }
                        else {
                            returnString += 'set favourite"> &#9734;';
                        }
                        return [2 /*return*/, returnString + '</a>'];
                }
            });
        });
    };
    Restaurant.prototype.fillRestaurantHoursHTML = function () {
        var hours = document.getElementById('restaurant-hours');
        hours.innerHTML = '';
        for (var key in this.restaurant.operating_hours) {
            var row = document.createElement('tr');
            var day = document.createElement('td');
            day.innerHTML = key;
            row.appendChild(day);
            var time = document.createElement('td');
            time.innerHTML = this.restaurant.operating_hours[key];
            row.appendChild(time);
            hours.appendChild(row);
        }
    };
    Restaurant.prototype.fillReviewsHTML = function () {
        return __awaiter(this, void 0, void 0, function () {
            var container, title, form, reviews, noReviews, ul;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container = document.getElementById('reviews-container');
                        container.innerHTML = '';
                        title = document.createElement('h3');
                        title.setAttribute('tabindex', '0');
                        title.innerHTML = 'Reviews';
                        container.appendChild(title);
                        form = document.createElement('div');
                        form.innerHTML = "\n      <div class=\"form_review\">\n          <label for=\"form_name\">Your Name:</label>\n          <input type=\"text\" id=\"form_name\" />\n          <label for=\"form_rating\">Your Rating:</label>\n          <select id=\"form_rating\">\n            <option value=\"1\">1 Star</option>\n            <option value=\"2\">2 Stars</option>\n            <option value=\"3\">3 Stars</option>\n            <option value=\"4\">4 Stars</option>\n            <option value=\"5\">5 Stars</option>\n          </select>\n          <label for=\"form_review\">Your Message:</label>\n          <textarea id=\"form_review\"></textarea>\n          <input type=\"submit\" value=\"Send Review\" id=\"form_submit\"\n                 aria-label=\"Send Review\" />\n      </div>\n    ";
                        container.appendChild(form);
                        document.getElementById('form_submit')
                            .addEventListener('click', this.formSubmit.bind(this));
                        return [4 /*yield*/, this.dbManager.getReviewsByRestaurantId(this.restaurant.id)];
                    case 1:
                        reviews = _a.sent();
                        if (!reviews.length) {
                            noReviews = document.createElement('p');
                            noReviews.innerHTML = 'No reviews yet!';
                            container.appendChild(noReviews);
                            return [2 /*return*/];
                        }
                        ul = document.createElement('ul');
                        ul.setAttribute('id', 'reviews-list');
                        reviews.forEach(function (review) {
                            ul.appendChild(_this.createReviewHTML(review));
                        });
                        container.appendChild(ul);
                        return [2 /*return*/];
                }
            });
        });
    };
    Restaurant.prototype.formSubmit = function (event) {
        this.dbManager.addReviewByRestaurant(this.restaurant.id, document.getElementById('form_name').value, parseInt(document.getElementById('form_rating').value, 10), document.getElementById('form_review').value);
        document.getElementById('form_name').value = '';
        document.getElementById('form_rating').value = '';
        document.getElementById('form_review').value = '';
        this.fillReviewsHTML();
    };
    Restaurant.prototype.createReviewHTML = function (review) {
        var li = document.createElement('li');
        var reviewHead = document.createElement('div');
        reviewHead.classList.add('review-head');
        var name = document.createElement('span');
        name.classList.add('review-name');
        name.innerHTML = review.name;
        reviewHead.appendChild(name);
        var date = document.createElement('span');
        date.classList.add('review-date');
        date.innerHTML = (new Date(review.updatedAt)).toString();
        reviewHead.appendChild(date);
        li.appendChild(reviewHead);
        var rating = document.createElement('p');
        rating.classList.add('review-rating');
        rating.innerHTML = "Rating: " + review.rating;
        li.appendChild(rating);
        var comments = document.createElement('p');
        comments.innerHTML = review.comments;
        li.appendChild(comments);
        return li;
    };
    Restaurant.prototype.fillBreadcrumb = function () {
        var breadcrumb = document.querySelector('#breadcrumb ul');
        var li = document.createElement('li');
        var currentPage = document.createElement('a');
        currentPage.innerHTML = this.restaurant.name;
        currentPage.setAttribute('aria-current', 'page');
        currentPage.href = '#';
        li.appendChild(currentPage);
        breadcrumb.appendChild(li);
    };
    Restaurant.getRestaurantSrcset = function (image) {
        var srcset = '';
        [200, 300, 600].forEach(function (size) {
            srcset += "/img/" + size + "/" + image + " " + size + "w,";
        });
        return (srcset.slice(0, -1));
    };
    Restaurant.urlForRestaurant = function (restaurant) {
        return "./restaurant.html?id=" + restaurant.id;
    };
    return Restaurant;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__idb__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__idb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__idb__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var DBManager = /** @class */ (function () {
    function DBManager() {
        this.refreshDB();
        this.dbPromise = __WEBPACK_IMPORTED_MODULE_0__idb__["open"]('restaurantApp', 3, this.updateDBStructure);
        this.retryPendingReviewRequests();
    }
    DBManager.prototype.refreshDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchRestaurants()];
                    case 1:
                        (_a.sent()).forEach(function (restaurant) {
                            _this.dbPromise.then(function (db) {
                                var dbRestaurant = db.transaction('restaurant', 'readwrite')
                                    .objectStore('restaurant');
                                _this.fetchReviewsByRestaurant(restaurant['id']).then(function (reviews) {
                                    if (reviews) {
                                        _this.clearDB('review', restaurant['id']);
                                        reviews.forEach(function (review) {
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
                        return [2 /*return*/];
                }
            });
        });
    };
    DBManager.prototype.clearDB = function (objectStoreName, restaurantId) {
        this.dbPromise.then(function (db) {
            var objectStore = db.transaction(objectStoreName, 'readwrite')
                .objectStore(objectStoreName);
            if (!restaurantId) {
                objectStore.clear();
                return;
            }
            var index = 'restaurantId';
            if (objectStoreName === 'restaurant') {
                index = 'id';
            }
            objectStore.index(index).getAllKeys(restaurantId).then(function (r) {
                objectStore.delete(r);
            });
        });
    };
    DBManager.prototype.updateDBStructure = function (upgradeDB) {
        switch (upgradeDB.oldVersion) {
            case 0:
                var restaurantObject = upgradeDB.createObjectStore('restaurant', { keyPath: 'id' });
                restaurantObject.createIndex('id', 'id', { unique: false });
                var reviewObject = upgradeDB.createObjectStore('review', { keyPath: 'rid', autoIncrement: true });
                reviewObject.createIndex('restaurantId', 'restaurantId', { unique: false });
            case 1:
                var pendingReviewRequests = upgradeDB.createObjectStore('pendingReviewRequests', { keyPath: 'pid', autoIncrement: true });
            case 2:
                var favourites = upgradeDB.createObjectStore('favourite');
        }
    };
    DBManager.prototype.fetchRestaurants = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchData(DBManager.DATABASE_URL + 'restaurants')
                        .then(function (restaurants) {
                        _this.clearDB('restaurant');
                        return _this.checkForMissingPhotograph(restaurants);
                    })];
            });
        });
    };
    DBManager.prototype.fetchReviewsByRestaurant = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchData(DBManager.DATABASE_URL + 'reviews/?restaurant_id=' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DBManager.prototype.fetchData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url);
                        xhr.onload = function () {
                            if (xhr.status === 200) { // Got a success response from server!
                                var json = JSON.parse(xhr.responseText);
                                resolve(json);
                            }
                            else {
                                reject();
                                console.log("\n                  Failed to connect to database! Failfurecode: Request failed.\n                  Returned status of " + xhr.status);
                            }
                            resolve([]);
                        };
                        xhr.send();
                    })];
            });
        });
    };
    DBManager.prototype.checkForMissingPhotograph = function (restaurants) {
        restaurants.forEach(function (restaurant) {
            if (!restaurant.photograph) {
                restaurant.photograph = restaurant.id.toString();
            }
            if (!restaurant.photograph.toString().match(/.*jpg/)) {
                restaurant.photograph += '.jpg';
            }
        });
        return restaurants;
    };
    DBManager.prototype.getAllNeighborhoods = function () {
        return __awaiter(this, void 0, void 0, function () {
            var restaurants, neighborhoods;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllRestaurantDetails()];
                    case 1:
                        restaurants = _a.sent();
                        neighborhoods = [];
                        restaurants.forEach(function (restaurant) {
                            if (!neighborhoods.includes(restaurant.neighborhood)) {
                                neighborhoods.push(restaurant.neighborhood);
                            }
                        });
                        return [2 /*return*/, neighborhoods];
                }
            });
        });
    };
    DBManager.prototype.getAllCuisines = function () {
        return __awaiter(this, void 0, void 0, function () {
            var restaurants, cuisines;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllRestaurantDetails()];
                    case 1:
                        restaurants = _a.sent();
                        cuisines = [];
                        restaurants.forEach(function (restaurant) {
                            if (!cuisines.includes(restaurant.cuisine_type)) {
                                cuisines.push(restaurant.cuisine_type);
                            }
                        });
                        return [2 /*return*/, cuisines];
                }
            });
        });
    };
    DBManager.prototype.getRestaurantDetail = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.dbPromise.then(function (db) {
                            db.transaction('restaurant')
                                .objectStore('restaurant')
                                .index('id')
                                .get(id)
                                .then(function (restaurant) {
                                resolve(restaurant);
                            });
                        });
                    })];
            });
        });
    };
    DBManager.prototype.getRestaurantsDetails = function (neighborhood, cuisines) {
        return __awaiter(this, void 0, void 0, function () {
            var restaurants, choosenRestaurants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllRestaurantDetails()];
                    case 1:
                        restaurants = _a.sent();
                        choosenRestaurants = [];
                        restaurants.forEach(function (restaurant) {
                            if ((restaurant.neighborhood == neighborhood || neighborhood == 'all') &&
                                (restaurant.cuisine_type == cuisines || cuisines == 'all')) {
                                choosenRestaurants.push(restaurant);
                            }
                        });
                        return [2 /*return*/, choosenRestaurants];
                }
            });
        });
    };
    DBManager.prototype.getAllRestaurantDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.dbPromise.then(function (db) {
                            db.transaction('restaurant')
                                .objectStore('restaurant')
                                .getAll()
                                .then(function (restaurants) {
                                resolve(restaurants);
                            });
                        });
                    })];
            });
        });
    };
    DBManager.prototype.getReviewsByRestaurantId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.dbPromise.then(function (db) {
                            db.transaction('review')
                                .objectStore('review')
                                .index('restaurantId')
                                .getAll(id)
                                .then(function (reviews) {
                                resolve(reviews.reverse());
                            });
                        });
                    })];
            });
        });
    };
    DBManager.prototype.addReviewByRestaurant = function (restaurantId, name, rating, comments) {
        this.dbPromise.then(function (db) {
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
    };
    DBManager.prototype.sendReview = function (review) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', DBManager.DATABASE_URL + 'reviews/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 &&
                (xhr.status !== 200 || xhr.status !== 201)) {
                _this.addToPendingReviewRequests(review);
            }
        };
        xhr.onerror = function () {
            _this.addToPendingReviewRequests(review);
        };
        xhr.send(JSON.stringify(review));
    };
    DBManager.prototype.addToPendingReviewRequests = function (review) {
        this.dbPromise.then(function (db) {
            db.transaction('pendingReviewRequests', 'readwrite')
                .objectStore('pendingReviewRequests')
                .put(review);
        });
    };
    DBManager.prototype.retryPendingReviewRequests = function () {
        var _this = this;
        this.dbPromise.then(function (db) {
            db.transaction('pendingReviewRequests')
                .objectStore('pendingReviewRequests')
                .getAll()
                .then(function (reviews) {
                db.transaction('pendingReviewRequests', 'readwrite')
                    .objectStore('pendingReviewRequests')
                    .clear();
                reviews.forEach(function (review) { return _this.sendReview(review); });
            });
        });
        window.setTimeout(this.retryPendingReviewRequests.bind(this), 3000);
    };
    DBManager.prototype.isFavouriteRestaurant = function (restaurantId) {
        return this.dbPromise.then(function (db) {
            return db.transaction('favourite')
                .objectStore('favourite')
                .get(restaurantId);
        });
    };
    DBManager.prototype.changeFavouriteState = function (restaurantId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbPromise.then(function (db) {
                            return db.transaction('favourite')
                                .objectStore('favourite')
                                .get(restaurantId).then(function (r) {
                                _this.dbPromise.then(function (db) {
                                    if (r) {
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
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DBManager.DATABASE_URL = 'https://pure-dusk-67754.herokuapp.com/';
    return DBManager;
}());



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
      if (!(funcName in Constructor.prototype)) return;

      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      if (request) {
        request.onupgradeneeded = function(event) {
          if (upgradeCallback) {
            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
          }
        };
      }

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {
    self.idb = exp;
  }
}());


/***/ })
/******/ ]);
});