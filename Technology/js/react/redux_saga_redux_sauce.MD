###saga sauce    
প্রথমে createAction function এর মাধ্যমে action and constants create করলাম। So আমাদের হাতে এখন Action and constants (type) আছে।   
Reducer এ আগে আমরা switch case লিখতাম এর পরিবর্তে এখন আমরা standalone function লিখবো। 
এবং createReducer এ mapping korbo এই constants(Type.constantsName) এর জন্য এই function

### redux file to create constants and action   
~~~~
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const fetchTestimonialsRequest = () => {

}

const { Types, Creators } = createActions({
  fetchTestimonialsRequest: ['offset', 'length'],
  createTestimonialRequest: ['requestObject'],
})

export const TestimonialTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  testimonials: [],
  showLoader: false
})

/* ------------- Reducers ------------- */

// we're attempting to make API call
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully made the API call
export const success = (state: Object, { testimonials }: Object) => state.merge({ fetching: false, error: null, testimonials })

// we've had a problem with API Call
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

export const createTestimonialRequest = (state: Object) => state.merge({ showLoader: true })
export const createTestimonialSuccess = (state: Object) => state.merge({ showLoader: false })
export const createTestimonialFailure = (state: Object) => state.merge({ showLoader: false })

export const editTestimonialRequest = (state: Object) => state.merge({ showLoader: true })
export const editTestimonialSuccess = (state: Object) => state.merge({ showLoader: false })
export const editTestimonialFailure = (state: Object) => state.merge({ showLoader: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_TESTIMONIALS_REQUEST]: request,
  [Types.FETCH_TESTIMONIALS_SUCCESS]: success,
  [Types.FETCH_TESTIMONIALS_FAILURE]: failure,
  [Types.CREATE_TESTIMONIAL_REQUEST]: createTestimonialRequest,
  [Types.CREATE_TESTIMONIAL_SUCCESS]: createTestimonialSuccess,
  [Types.CREATE_TESTIMONIAL_FAILURE]: createTestimonialFailure,
  [Types.EDIT_TESTIMONIAL_REQUEST]: editTestimonialRequest,
  [Types.EDIT_TESTIMONIAL_SUCCESS]: editTestimonialSuccess,
  [Types.EDIT_TESTIMONIAL_FAILURE]: editTestimonialFailure,
})

/* ------------- Selectors ------------- */

// Get the list of news and testimonials
export const testimonials = (testimonialState: Object) => testimonialState.testimonials
~~~~

### Middleware Saga    
Saga এর একটা separate file create করব
all saga ফাইল একটা Root Saga ফাইল এ import করব
~~~~
//editTestimonial.saga.js
import { call, put } from 'redux-saga/effects'
import TestimonialActions from '../../Redux/TestimonialsRedux'

import {AsyncStorage} from 'react-native';

import NetworkConfig from '../../Config/NetworkConfig'

import { Actions as NavigationActions } from 'react-native-router-flux'

// attempts to login

console.log('NetworkConfig',NetworkConfig.FEATURES_URL, NetworkConfig.META);

export function * editTestimonial ({requestObject}) {
  const URL = 'testimonials/editTestimonialAPI/v1/';
  const FULL_URL = NetworkConfig.FEATURES_URL + URL;
  const body = JSON.stringify({
    "data": JSON.stringify(JSON.stringify(requestObject)),
    "clientKeyDetailsId": NetworkConfig.META.clientKeyDetailsId
  });
   console.log("requestObject inside saga", requestObject);
  try {
    const response = yield call(fetch, FULL_URL, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer '+NetworkConfig.META.authToken,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: body
      }
    );

    if (response.status >= 200 && response.status < 300) {
      NavigationActions.EditTestimonials();
      const jsonResponse = yield response.json();
      console.log('jsonResponse', TestimonialActions);
      yield put(TestimonialActions.editTestimonialSuccess('success'))
      yield put(TestimonialActions.fetchTestimonialsRequest(0, 1000));
    } else {
      throw response;
      yield put(TestimonialActions.editTestimonialFailure('failure'))
    }
  }
  catch (err) {
    yield put(TestimonialActions.editTestimonialFailure('failure'))
  }

}
~~~~

### root saga    
এটা এক ধরনের ম্যাপিং যেখানে আমি বলব এই redux Action এর জন্য এই saga file। reduxAction এ যে আর্গুমেন্ট দিব saga file তা আর্গুমেন্ট হিসাবে নিবে destruction way like `export function * editTestimonial ({requestObject}) {}`     
~~~~
import { TestimonialTypes } from '../Redux/TestimonialsRedux'
import { fetchTestimonials } from './Testimonials/Edit';
import { createTestimonial } from './Testimonials/createTestimonial.sagas';
import { editTestimonial } from './Testimonials/editTestimonial.sagas.js';
export default function * root () {
  yield [
    takeLatest(TestimonialTypes.FETCH_TESTIMONIALS_REQUEST, fetchTestimonials),
    takeLatest(TestimonialTypes.CREATE_TESTIMONIAL_REQUEST, createTestimonial),
    takeLatest(TestimonialTypes.EDIT_TESTIMONIAL_REQUEST, editTestimonial)
 ]
}
~~~~



