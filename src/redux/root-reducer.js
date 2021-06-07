import { combineReducers } from "redux";

import NasaPhotoReducer from "./NasaPhotoReducer";

const rootReducer = combineReducers({
	NasaPhotoReducer: NasaPhotoReducer,
});

export default rootReducer;
