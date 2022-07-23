export const BASE_URL = "http://192.168.10.5:5000/"



//auth
export const LOGIN_URL = BASE_URL+'api/auth/login';
export const SIGNUP_URL = BASE_URL+'api/auth/signup';

//user
export const MYACCOUNT_URL = BASE_URL+'api/user/myaccount';
export const EDITACCOUNT_URL = BASE_URL+'api/user/editaccount';



//image

export const IMAGEUPLOAD_URL = BASE_URL+'api/imageupload/';
export const VIEWIMAGE_URL = BASE_URL+'image?image_url=';

//home
export const HOME_FRUITE_CATEGORIES_URL = BASE_URL+'api/home/categories';
export const HOME_FRUITES_URL = BASE_URL+'api/home/fruits';
export const HOME_LIKE_FRUITES_URL = BASE_URL+'api/home/like_fruite';
export const HOME_UNLIKE_FRUITES_URL = BASE_URL+'api/home/unlike_fruite';

export const HOME_NUTRITION_FRUITES_URL = BASE_URL+'api/home/nutrition_fruite';
export const HOME_ADDTOCART_FRUITES_URL = BASE_URL+'api/home/addtocart';


//fav
export const FAV_VIEW_FRUITES_URL = BASE_URL+'api/fav/view';


//cart

export const CART_VIEW_URL = BASE_URL+'api/cart/view';
export const CART_CATEGORIES_URL = BASE_URL+'api/cart/categories';
export const CART_QUANTITY_URL = BASE_URL+'api/cart/quantity';

//Stripe
export const STRIPE_PAYMENT_URL = BASE_URL+'api/stripe/payment';
