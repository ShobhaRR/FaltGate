import api from "./api";

export const getAdminDashboard = () => {

    return api.get("/admin/dashboard");

};

export const getApartments = () => {

    return api.get("/admin/apartments");

};

export const getAllGuests = () => {

    return api.get("/admin/guests");

};

export const addGuestByAdmin = (data) => {

    return api.post("/admin/guest", data);

};
