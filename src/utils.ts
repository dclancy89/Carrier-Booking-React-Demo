import { DGEUser } from "./types";
import axios from "axios";

const localStorageItemName = "DGEUserID";

export const setLocalUser = (user: DGEUser | null) => {
  if (!user) {
    return false;
  }
  localStorage.setItem(localStorageItemName, user.id);
  return true;
};

export const fetchLocalUser = async () => {
  const userId = localStorage.getItem(localStorageItemName);
  if (userId) {
    const user = await axios.get(`http://localhost:3000/users/id/${userId}`);
    return user.data;
  } else {
    return null;
  }
};

export const removeLocalUser = () => {
  localStorage.removeItem(localStorageItemName);
};
