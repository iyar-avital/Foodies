// save short ids of products we visited in to show after in the home page
export const VISITED_PRODUCT = "visitedProduct";
export const CART = "cart_shop";
export const STORE_SHORT_IDS = "store_short_ids";
export const USER_DETAILS = "user_details";

//user details

export const saveCartLocal = (_cart_ar) => {
  localStorage.setItem(CART, JSON.stringify(_cart_ar));
};
export const getCartLocal = () => {
  if (localStorage[CART]) {
    return JSON.parse(localStorage[CART]);
  }
  return [];
};

//save an array of all users' stores shorts id
export const saveStoresIdsLocall = (store_short_ids) => {
  localStorage.setItem(STORE_SHORT_IDS, JSON.stringify(store_short_ids));
};

//certify that the user own the store
export const checklocallStoreIds = (_shortId) => {
  if (localStorage[STORE_SHORT_IDS]) {
    return JSON.parse(localStorage[STORE_SHORT_IDS]).includes(_shortId);
  } else return null;
};

export const addProdVisitedToLocal = (_short_id) => {
  // if there local of products local_ar equal to the data in local if not equal to new array
  // Primitive array cant do stringfy or parse , need to use split or join
  // split - like parse of JSON for primtive array
  let local_ar = localStorage[VISITED_PRODUCT] ? localStorage[VISITED_PRODUCT].split(",") : [];
  // check if id already in local
  if (!local_ar.includes(_short_id)) {
    // add new cell in array in the start
    local_ar.unshift(_short_id);
    // for save only 4 products
    local_ar.splice(4, local_ar.length);
    // console.log(local_ar)
    // Primitive array cant do stringfy or parse , need to use split or join
    // join like stringfy of JSON just for primitive array
    localStorage.setItem(VISITED_PRODUCT, local_ar.join(","));
  }
};

// return the shorts_id of products we visited as string for
// URL to api request
export const checkVisitedLocal = () => {
  if (localStorage[VISITED_PRODUCT]) {
    return localStorage[VISITED_PRODUCT];
  }
  return null;
};
