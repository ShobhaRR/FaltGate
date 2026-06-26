import api from "./api";

export const addGuest = data =>

    api.post("/guest", data);


export const getGuests = () =>

    api.get("/guest");


export const cancelGuest = id =>

    api.put(`/guest/cancel/${id}`);


export const getMyGuests = () => {

    return api.get("/guest");

};
