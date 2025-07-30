import Axios from "axios";
import Cookies from "js-cookie";

export interface CustomError {
  message?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

const ClientRequest = Axios.create({
  baseURL: baseUrl,
  maxBodyLength: Infinity,
});

const access_token = Cookies.get("access_token");

if (access_token) {
  ClientRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${access_token}`;
}

ClientRequest.defaults.headers.common["ngrok-skip-browser-warning"] = "true"; // keep ngrok warning away..

ClientRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
    } as CustomError;
    return Promise.reject(customError);
  }
);

export default ClientRequest;
