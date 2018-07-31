"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var idb = require("./idb");
// TODO: remove any
var DBManager = /** @class */ (function () {
    function DBManager() {
        this.refreshDB();
        this.dbPromise = idb.open('restaurantApp', 1, this.updateDBStructure);
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
                                var reviews = [];
                                restaurant['reviews'].forEach(function (review) {
                                    review['restaurantId'] = restaurant['id'];
                                    reviews.push(review);
                                });
                                delete restaurant['reviews'];
                                dbRestaurant.put(restaurant);
                                var dbReview = db.transaction('review', 'readwrite').objectStore('review');
                                for (var i in reviews) {
                                    dbReview.put(reviews[i]);
                                }
                            });
                        });
                        return [2 /*return*/];
                }
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
        }
    };
    DBManager.prototype.fetchRestaurants = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', DBManager.DATABASE_URL);
                        xhr.onload = function () {
                            if (xhr.status === 200) { // Got a success response from server!
                                var json = JSON.parse(xhr.responseText);
                                resolve(_this.checkForMissingPhotograph(json));
                            }
                            else {
                                console.log("\n              Failed to connect to database! Failfurecode: Request failed.\n              Returned status of " + xhr.status);
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
                                resolve(reviews);
                            });
                        });
                    })];
            });
        });
    };
    DBManager.DATABASE_URL = 'http://localhost:1337/restaurants';
    return DBManager;
}());
exports.DBManager = DBManager;
