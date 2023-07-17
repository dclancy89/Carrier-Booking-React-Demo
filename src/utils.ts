import { DGEUser } from "./types";

export const setLocalUser = (user: DGEUser | null) => {
  if (!user) {
    return false;
  }
  localStorage.setItem("DGEUserID", user.id);
  return true;
};

export const fetchLocalUser = () => {
  return localStorage.getItem("DGEUserId");
};
