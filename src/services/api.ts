
import axios from "axios";

// json-serve --watch db.json
export const api = axios.create({
  baseURL: "http://localhost:3000"
})