!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Restaurant=t():e.Restaurant=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n(2),o=(n.n(r),this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,u)}s((r=r.apply(e,t||[])).next())})}),i=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},a=function(){function e(){this.refreshDB(),this.dbPromise=r.open("restaurantApp",2,this.updateDBStructure),this.retryPendingReviewRequests()}return e.prototype.refreshDB=function(){return o(this,void 0,void 0,function(){var e=this;return i(this,function(t){switch(t.label){case 0:return[4,this.fetchRestaurants()];case 1:return t.sent().forEach(function(t){e.dbPromise.then(function(n){var r=n.transaction("restaurant","readwrite").objectStore("restaurant");e.fetchReviewsByRestaurant(t.id).then(function(r){r&&(e.clearDB("review",t.id),r.forEach(function(e){e.restaurantId=t.id,n.transaction("review","readwrite").objectStore("review").put(e)}))}),r.put(t)})}),[2]}})})},e.prototype.clearDB=function(e,t){this.dbPromise.then(function(n){var r=n.transaction(e,"readwrite").objectStore(e);if(t){var o="restaurantId";"restaurant"===e&&(o="id"),r.index(o).getAllKeys(t).then(function(e){r.delete(e)})}else r.clear()})},e.prototype.updateDBStructure=function(e){switch(e.oldVersion){case 0:e.createObjectStore("restaurant",{keyPath:"id"}).createIndex("id","id",{unique:!1}),e.createObjectStore("review",{keyPath:"rid",autoIncrement:!0}).createIndex("restaurantId","restaurantId",{unique:!1});case 1:e.createObjectStore("pendingReviewRequests",{keyPath:"pid",autoIncrement:!0})}},e.prototype.fetchRestaurants=function(){return o(this,void 0,void 0,function(){var t=this;return i(this,function(n){return[2,this.fetchData(e.DATABASE_URL+"restaurants").then(function(e){return t.clearDB("restaurant"),t.checkForMissingPhotograph(e)})]})})},e.prototype.fetchReviewsByRestaurant=function(t){return o(this,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return[4,this.fetchData(e.DATABASE_URL+"reviews/?restaurant_id="+t)];case 1:return[2,n.sent()]}})})},e.prototype.fetchData=function(e){return o(this,void 0,void 0,function(){return i(this,function(t){return[2,new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e),r.onload=function(){if(200===r.status){var e=JSON.parse(r.responseText);t(e)}else n(),console.log("\n                  Failed to connect to database! Failfurecode: Request failed.\n                  Returned status of "+r.status);t([])},r.send()})]})})},e.prototype.checkForMissingPhotograph=function(e){return e.forEach(function(e){e.photograph||(e.photograph=e.id.toString()),e.photograph.toString().match(/.*jpg/)||(e.photograph+=".jpg")}),e},e.prototype.getAllNeighborhoods=function(){return o(this,void 0,void 0,function(){var e,t;return i(this,function(n){switch(n.label){case 0:return[4,this.getAllRestaurantDetails()];case 1:return e=n.sent(),t=[],e.forEach(function(e){t.includes(e.neighborhood)||t.push(e.neighborhood)}),[2,t]}})})},e.prototype.getAllCuisines=function(){return o(this,void 0,void 0,function(){var e,t;return i(this,function(n){switch(n.label){case 0:return[4,this.getAllRestaurantDetails()];case 1:return e=n.sent(),t=[],e.forEach(function(e){t.includes(e.cuisine_type)||t.push(e.cuisine_type)}),[2,t]}})})},e.prototype.getRestaurantDetail=function(e){return o(this,void 0,void 0,function(){var t=this;return i(this,function(n){return[2,new Promise(function(n){t.dbPromise.then(function(t){t.transaction("restaurant").objectStore("restaurant").index("id").get(e).then(function(e){n(e)})})})]})})},e.prototype.getRestaurantsDetails=function(e,t){return o(this,void 0,void 0,function(){var n,r;return i(this,function(o){switch(o.label){case 0:return[4,this.getAllRestaurantDetails()];case 1:return n=o.sent(),r=[],n.forEach(function(n){n.neighborhood!=e&&"all"!=e||n.cuisine_type!=t&&"all"!=t||r.push(n)}),[2,r]}})})},e.prototype.getAllRestaurantDetails=function(){return o(this,void 0,void 0,function(){var e=this;return i(this,function(t){return[2,new Promise(function(t){e.dbPromise.then(function(e){e.transaction("restaurant").objectStore("restaurant").getAll().then(function(e){t(e)})})})]})})},e.prototype.getReviewsByRestaurantId=function(e){return o(this,void 0,void 0,function(){var t=this;return i(this,function(n){return[2,new Promise(function(n){t.dbPromise.then(function(t){t.transaction("review").objectStore("review").index("restaurantId").getAll(e).then(function(e){n(e.reverse())})})})]})})},e.prototype.addReviewByRestaurant=function(e,t,n,r){this.dbPromise.then(function(o){o.transaction("review","readwrite").objectStore("review").put({restaurantId:e,restuarant_id:e,name:t,createdAt:Date.now(),updatedAt:Date.now(),rating:n,comments:r})}),this.sendReview({restaurant_id:e,name:t,rating:n,comments:r})},e.prototype.sendReview=function(t){var n=this,r=new XMLHttpRequest;r.open("POST",e.DATABASE_URL+"reviews/",!0),r.setRequestHeader("Content-Type","application/json"),r.onreadystatechange=function(){4!=r.readyState||200===r.status&&201===r.status||n.addToPendingReviewRequests(t)},r.onerror=function(){n.addToPendingReviewRequests(t)},r.send(JSON.stringify(t))},e.prototype.addToPendingReviewRequests=function(e){this.dbPromise.then(function(t){t.transaction("pendingReviewRequests","readwrite").objectStore("pendingReviewRequests").put(e)})},e.prototype.retryPendingReviewRequests=function(){var e=this;this.dbPromise.then(function(t){t.transaction("pendingReviewRequests").objectStore("pendingReviewRequests").getAll().then(function(n){t.transaction("pendingReviewRequests","readwrite").objectStore("pendingReviewRequests").clear(),n.forEach(function(t){return e.sendReview(t)})})}),window.setTimeout(this.retryPendingReviewRequests.bind(this),3e3)},e.DATABASE_URL="https://pure-dusk-67754.herokuapp.com/",e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"Main",function(){return u});var r=n(0),o=n(3),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,u)}s((r=r.apply(e,t||[])).next())})},a=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},u=function(){function e(){this.dbManager=new r.a,this.fillNeighborhoodsHTML(),this.fillCuisinesHTML(),this.fillRestaurantsHTML()}return e.prototype.fillNeighborhoodsHTML=function(){return i(this,void 0,void 0,function(){var e,t=this;return a(this,function(n){switch(n.label){case 0:return e=document.getElementById("neighborhoods-select"),[4,this.dbManager.getAllNeighborhoods()];case 1:return n.sent().forEach(function(t){var n=document.createElement("option");n.innerHTML=t,n.value=t,e.appendChild(n)}),document.getElementById("neighborhoods-select").addEventListener("change",function(){t.fillRestaurantsHTML()}),[2]}})})},e.prototype.fillCuisinesHTML=function(){return i(this,void 0,void 0,function(){var e,t=this;return a(this,function(n){switch(n.label){case 0:return(e=document.getElementById("cuisines-select")).setAttribute("aria-label","Select Cuisines"),[4,this.dbManager.getAllCuisines()];case 1:return n.sent().forEach(function(t){var n=document.createElement("option");n.innerHTML=t,n.value=t,e.appendChild(n)}),document.getElementById("cuisines-select").addEventListener("change",function(){t.fillRestaurantsHTML()}),[2]}})})},e.prototype.fillRestaurantsHTML=function(){return i(this,void 0,void 0,function(){var e,t,n,r,o,i,u=this;return a(this,function(a){switch(a.label){case 0:return e=document.getElementById("neighborhoods-select"),t=e.options[e.selectedIndex].value,n=document.getElementById("cuisines-select"),r=n.options[n.selectedIndex].value,[4,this.dbManager.getRestaurantsDetails(t,r)];case 1:return o=a.sent(),this.resetRestaurants(),i=document.getElementById("restaurants-list"),o.forEach(function(e){i.appendChild(u.createRestaurantHTML(e))}),addMarkersToMap(o),[2]}})})},e.prototype.resetRestaurants=function(){document.getElementById("restaurants-list").innerHTML="",removeMarkersFromMap()},e.prototype.createRestaurantHTML=function(e){var t=document.createElement("li"),n=document.createElement("img");n.className="restaurant-img",n.alt="photograph of "+e.name,n.src="/img/"+e.photograph,n.srcset=o.a.getRestaurantSrcset(e.photograph),t.appendChild(n);var r=document.createElement("h2");r.innerHTML=e.name,r.setAttribute("tabindex","0"),t.appendChild(r);var i=document.createElement("p");i.innerHTML=e.neighborhood,t.appendChild(i);var a=document.createElement("p");a.innerHTML=e.address,t.appendChild(a);var u=document.createElement("a");return u.setAttribute("aria-label",e.name),u.innerHTML="View Details",u.href=this.urlForRestaurant(e),t.appendChild(u),t},e.prototype.urlForRestaurant=function(e){return o.a.urlForRestaurant(e)},e}()},function(e,t,n){"use strict";!function(){function t(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function n(e,n,r){var o,i=new Promise(function(i,a){t(o=e[n].apply(e,r)).then(i,a)});return i.request=o,i}function r(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return n(this[t],o,arguments)})})}function i(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function a(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return e=this[t],(r=n(e,o,arguments)).then(function(e){if(e)return new s(e,r.request)});var e,r})})}function u(e){this._index=e}function s(e,t){this._cursor=e,this._request=t}function c(e){this._store=e}function l(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function d(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new l(n)}function p(e){this._db=e}r(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),a(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(s,"_cursor",["direction","key","primaryKey","value"]),o(s,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(s.prototype[e]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[e].apply(n._cursor,r),t(n._request).then(function(e){if(e)return new s(e,n._request)})})})}),c.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},c.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},r(c,"_store",["name","keyPath","indexNames","autoIncrement"]),o(c,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),a(c,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),i(c,"_store",IDBObjectStore,["deleteIndex"]),l.prototype.objectStore=function(){return new c(this._tx.objectStore.apply(this._tx,arguments))},r(l,"_tx",["objectStoreNames","mode"]),i(l,"_tx",IDBTransaction,["abort"]),d.prototype.createObjectStore=function(){return new c(this._db.createObjectStore.apply(this._db,arguments))},r(d,"_db",["name","version","objectStoreNames"]),i(d,"_db",IDBDatabase,["deleteObjectStore","close"]),p.prototype.transaction=function(){return new l(this._db.transaction.apply(this._db,arguments))},r(p,"_db",["name","version","objectStoreNames"]),i(p,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[c,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),r=n[n.length-1],o=this._store||this._index,i=o[e].apply(o,n.slice(0,-1));i.onsuccess=function(){r(i.result)}})})}),[u,c].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(o){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():o(r)):o(r)})})})});var f={open:function(e,t,r){var o=n(indexedDB,"open",[e,t]),i=o.request;return i&&(i.onupgradeneeded=function(e){r&&r(new d(i.result,e.oldVersion,i.transaction))}),o.then(function(e){return new p(e)})},delete:function(e){return n(indexedDB,"deleteDatabase",[e])}};e.exports=f,e.exports.default=e.exports}()},function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n(0),o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},a=function(){function e(){this.dbManager=new r.a,this.loadRestaurant()}return e.prototype.loadRestaurant=function(){return o(this,void 0,void 0,function(){var e,t;return i(this,function(n){switch(n.label){case 0:return(e=parseInt(this.getParameterByName("id"),10))?(t=this,[4,this.dbManager.getRestaurantDetail(e)]):(console.error("No restaurant id in URL"),[2]);case 1:return t.restaurant=n.sent(),addMarkersToMap([this.restaurant]),this.fillRestaurantHTML(),this.fillBreadcrumb(),[2]}})})},e.prototype.getParameterByName=function(e,t){t||(t=location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},e.prototype.fillRestaurantHTML=function(){return o(this,void 0,void 0,function(){var t;return i(this,function(n){return document.getElementById("restaurant-name").innerHTML=this.restaurant.name,document.getElementById("restaurant-address").innerHTML=this.restaurant.address,(t=document.getElementById("restaurant-img")).className="restaurant-img",t.src="/img/"+this.restaurant.photograph,t.srcset=e.getRestaurantSrcset(this.restaurant.photograph),t.alt="photograph of "+this.restaurant.name,document.getElementById("restaurant-cuisine").innerHTML=this.restaurant.cuisine_type,this.restaurant.operating_hours&&this.fillRestaurantHoursHTML(),this.fillReviewsHTML(),[2]})})},e.prototype.fillRestaurantHoursHTML=function(){var e=document.getElementById("restaurant-hours");for(var t in this.restaurant.operating_hours){var n=document.createElement("tr"),r=document.createElement("td");r.innerHTML=t,n.appendChild(r);var o=document.createElement("td");o.innerHTML=this.restaurant.operating_hours[t],n.appendChild(o),e.appendChild(n)}},e.prototype.fillReviewsHTML=function(){return o(this,void 0,void 0,function(){var e,t,n,r,o,a,u=this;return i(this,function(i){switch(i.label){case 0:return(e=document.getElementById("reviews-container")).innerHTML="",(t=document.createElement("h3")).setAttribute("tabindex","0"),t.innerHTML="Reviews",e.appendChild(t),(n=document.createElement("div")).innerHTML='\n      <div class="form_review">\n          <label for="form_name">Your Name:</label>\n          <input type="text" id="form_name" />\n          <label for="form_rating">Your Rating:</label>\n          <select id="form_rating">\n            <option value="1">1 Star</option>\n            <option value="2">2 Stars</option>\n            <option value="3">3 Stars</option>\n            <option value="4">4 Stars</option>\n            <option value="5">5 Stars</option>\n          </select>\n          <label for="form_review">Your Message:</label>\n          <textarea id="form_review"></textarea>\n          <input type="submit" value="Send Review" id="form_submit"\n                 aria-label="Send Review" />\n      </div>\n    ',e.appendChild(n),document.getElementById("form_submit").addEventListener("click",this.formSubmit.bind(this)),[4,this.dbManager.getReviewsByRestaurantId(this.restaurant.id)];case 1:return(r=i.sent()).length?((a=document.createElement("ul")).setAttribute("id","reviews-list"),r.forEach(function(e){a.appendChild(u.createReviewHTML(e))}),e.appendChild(a),[2]):((o=document.createElement("p")).innerHTML="No reviews yet!",e.appendChild(o),[2])}})})},e.prototype.formSubmit=function(e){this.dbManager.addReviewByRestaurant(this.restaurant.id,document.getElementById("form_name").value,parseInt(document.getElementById("form_rating").value,10),document.getElementById("form_review").value),document.getElementById("form_name").value="",document.getElementById("form_rating").value="",document.getElementById("form_review").value="",this.fillReviewsHTML()},e.prototype.createReviewHTML=function(e){var t=document.createElement("li"),n=document.createElement("div");n.classList.add("review-head");var r=document.createElement("span");r.classList.add("review-name"),r.innerHTML=e.name,n.appendChild(r);var o=document.createElement("span");o.classList.add("review-date"),o.innerHTML=new Date(e.updatedAt).toString(),n.appendChild(o),t.appendChild(n);var i=document.createElement("p");i.classList.add("review-rating"),i.innerHTML="Rating: "+e.rating,t.appendChild(i);var a=document.createElement("p");return a.innerHTML=e.comments,t.appendChild(a),t},e.prototype.fillBreadcrumb=function(){var e=document.querySelector("#breadcrumb ul"),t=document.createElement("li"),n=document.createElement("a");n.innerHTML=this.restaurant.name,n.setAttribute("aria-current","page"),n.href="#",t.appendChild(n),e.appendChild(t)},e.getRestaurantSrcset=function(e){var t="";return[200,300,600].forEach(function(n){t+="/img/"+n+"/"+e+" "+n+"w,"}),t.slice(0,-1)},e.urlForRestaurant=function(e){return"./restaurant.html?id="+e.id},e}()}])});