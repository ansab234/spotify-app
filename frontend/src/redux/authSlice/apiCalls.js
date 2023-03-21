import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure } from "./index";
import dotenv from 'dotenv';

export const login = async (payload, dispatch) => {
	dispatch(loginStart());
	try {
		dotenv.config();
		const url = "https://weak-puce-kangaroo-cap.cyclic.app/api/login";

		// const url = "http://localhost:8080/api/login";
		// console.log("api-----aaaa", process.env.REACT_APP_API_URL)
		// const url = `${process.env.REACT_APP_API_URL}` + "/login"
		const { data } = await axios.post(url, payload);

		const decodeData = jwt_decode(data.data);
		dispatch(loginSuccess({ ...decodeData, token: data.data }));
		toast.success(data.message);
		window.location = "/home";
		return true;
	} catch (error) {
		dispatch(loginFailure());
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			toast.error(error.response.data.message);
		} else {
			console.log(error);
			toast.error("Something went wrong!");
		}
		return false;
	}
};
