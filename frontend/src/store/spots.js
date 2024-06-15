// store/spots.js
import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/setSpots';
const SET_SPOT_DETAILS = 'spots/setSpotDetails'
const SET_SPOT_REVIEWS = 'spots/setSpotReviews'
const ADD_SPOT = 'spots/addSpot';
const ADD_SPOT_IMAGES = 'spots/addSpotImages';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots,
});

const setSpotDetails = (spot) => ({
  type: SET_SPOT_DETAILS,
  payload: spot,
});

const setSpotReviews = (reviews) => ({
  type: SET_SPOT_REVIEWS,
  payload: reviews,
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

const addSpotImages = (images) => ({
  type: ADD_SPOT_IMAGES,
  payload: images,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'GET',
  });
  const data = await response.json();
  dispatch(setSpots(data.Spots));
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(setSpotDetails(spot));
  } else {
    // handle error
    console.error('Failed to fetch spot details');
  }
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  // console.log("RESPONSE", response)
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpotReviews(data));
  } else {
    console.error('Failed to fetch spot reviews');
  }
};

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const newSpot = await response.json();
    console.log("NEWSPOTTHUNK", newSpot)
    dispatch(addSpot(newSpot));
  } else {
    console.error('Failed to create spot');
  }
};

export const createSpotImages = (spotId, images) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header
      },
      body: JSON.stringify({ images }), // Convert images array to JSON string
    });

    if (response.ok) {
      const result = await response.json();
      dispatch(addSpotImages(result)); // Dispatch an action if needed
    } else {
      console.error('Failed to add spot images');
    }
  } catch (error) {
    console.error('Error adding spot images:', error);
  }
};

// Initial State
const initialState = {
  spots: [],
  currentSpot: null,
  spotReviews: [], //potential error?
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    case SET_SPOT_DETAILS:
      return { ...state, currentSpot: action.payload };
    case SET_SPOT_REVIEWS:
      return { ...state, spotReviews: action.payload };
    case ADD_SPOT:
      return { ...state, spots: [...state.spots, action.payload] };
    case ADD_SPOT_IMAGES:
      return state;
    default:
        return state;
  }
};

export default spotsReducer;
