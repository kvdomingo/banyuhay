import axios from "axios";

const baseURL = "/api";

const axi = axios.create({ baseURL });

export const api = {
  health: () => axi.get("/health"),
  toilets: {
    list: () => axi.get("/toilets"),
  },
};
