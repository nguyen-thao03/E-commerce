import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { sellerReducer } from "./reducers/sellerReducers";

const Store = configureStore({
    reducer:{
        user: userReducer,
        seller: sellerReducer,
    },
});

export default Store;