const INITIAL_STATE = {
	photoDate: new Date(),
	favorites: localStorage.getItem("favorites") ? localStorage.getItem("favorites").split(',') : [],
};

const NasaPhotoReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case "SET_PHOTO_DATE":
			return {
				...state,
				photoDate: action.payload,
			};
		case "DECREMENT_PHOTO_DATE":
			return {
				...state,
				photoDate: action.payload,
			};
        case "ADD_FAVORITE":
            return {
                ...state,
                favorites: action.payload,
            };
		default:
			return state;
	}
};

export default NasaPhotoReducer;
