import { Icategory, IListing, Inotifications } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
    allListing: IListing[]
    categories: Icategory[]
    savedListings: IListing[]
    notifications: Inotifications[]
}
const initialState: InitialStateType = {
    allListing: [],
    categories: [],
    savedListings: [],
    notifications: []
}
const MainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setAllLsiting: (state, action) => {
            state.allListing = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },

        saveUnsaveListing: (state, action) => {
            // Ensure savedListings is always an array
            if (!Array.isArray(state.savedListings)) {
                state.savedListings = [];
            }
            const isExists = state.savedListings.findIndex(l => l._id.toString() === action.payload._id.toString());

            if (isExists !== -1) {
                state.savedListings.splice(isExists, 1);
                console.log("listing already in your saved list, removing it.")
            } else {
                state.savedListings.push(action.payload);
                console.log("Listing added to your saved list.")
            }

        },

        setUserNotifications: (state, action) => {
            // Ensure savedListings is always an array
            if (!Array.isArray(state.notifications)) {
                state.notifications = [];
            }
            state.notifications = action.payload
        },

        // reseting state 

        removeAlldata: (state) => {
            state.allListing = [];
            state.categories = []
            state.savedListings = [];
            state.notifications = [];
        }

    }
})





export const { setAllLsiting, removeAlldata, setCategories, saveUnsaveListing, setUserNotifications } = MainSlice.actions
export default MainSlice.reducer