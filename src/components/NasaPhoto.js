import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

const apiKey =
	process.env.REACT_APP_NASA_KEY ||
	"yvAoDZNhamWV1EZLvnTpZ4XGpj4eJ1Ab2p0SasFp";

const NasaPhoto = (props) => {
	const [photoData, setPhotoData] = useState(null);
	const { photoDate, favorites, setPhotoDate, setFavorites } = props;

	useEffect(() => {
		fetchPhoto();

		async function fetchPhoto() {
			console.log(photoDate);
			const formattedPhotoDate =
				photoDate.getFullYear() +
				"-" +
				(photoDate.getMonth() + 1) +
				"-" +
				photoDate.getDate();
			const res = await fetch(
				`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedPhotoDate}`
			);
			const data = await res.json();
			setPhotoData(data);
			console.log(data);
		}
	}, [photoDate]);

	const favoritesArr = localStorage.getItem("favorites")
		? localStorage.getItem("favorites").split(",")
		: null;
	const favoritesLi = favoritesArr
		? favoritesArr.map((favorite, index) => {
				return <li key={index}>{favorite}</li>;
		  })
		: "";
    
	if (!photoData) return <div />;

	return (
		<>
			<NavBar />

			<DatePicker
				selected={photoDate}
				onChange={(date) => setPhotoDate(date)}
			/>

			<div className="button">
				<button
					onClick={() =>
						setPhotoDate(
							new Date(photoDate.setDate(photoDate.getDate() - 1))
						)
					}
				>
					Previous
				</button>
				<button
					onClick={() =>
						setPhotoDate(
							new Date(photoDate.setDate(photoDate.getDate() + 1))
						)
					}
				>
					Next
				</button>
			</div>

			<div>
				<button
					onClick={() =>
						setFavorites(favorites, photoDate.toDateString())
					}
				>
					Favorite
				</button>
			</div>

			<div className="nasa-photo">
				{photoData.media_type === "image" ? (
					<img
						src={photoData.url}
						alt={photoData.title}
						className="photo"
					/>
				) : (
					<iframe
						title="space-video"
						src={photoData.url}
						frameBorder="0"
						gesture="media"
						allow="encrypted-media"
						allowFullScreen
						className="photo"
					/>
				)}
				<div>
					<h1>{photoData.title}</h1>
					<p className="date">{photoData.date}</p>
					<p className="explanation">{photoData.explanation}</p>
				</div>
			</div>

			<div>
				<ul>{favoritesLi}</ul>
			</div>

			<div></div>
		</>
	);
};

function mapStateToProps(state) {
	return {
		photoDate: state.NasaPhotoReducer.photoDate,
		favorites: state.NasaPhotoReducer.favorites,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setPhotoDate(newDate) {
			console.log("set date");
			const action = { type: "SET_PHOTO_DATE", payload: newDate };
			dispatch(action);
		},
		setFavorites(favorites, newFavorite) {
			favorites.push(newFavorite);
			localStorage.setItem("favorites", favorites);
			const action = { type: "ADD_FAVORITE", payload: favorites };
			dispatch(action);
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NasaPhoto);
