import api from "./api";

export const getSecurityDashboard = () =>

    api.get("/security/dashboard");


export const getTodayVisitors = () =>

    api.get("/security/today");


export const getAllVisitors = () =>

    api.get("/security/all");

export const checkIn = id =>

    api.put(`/security/checkin/${id}`);


export const checkOut = id =>

    api.put(`/security/checkout/${id}`);