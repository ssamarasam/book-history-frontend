import axios from "axios";
import { getToken } from "../helpers";

export default axios.create({
  baseURL: "http://localhost:1337/",
  headers: {
    "Content-type": "application/json",
  },
});

// Authorization: "Bearer " + getToken(),
