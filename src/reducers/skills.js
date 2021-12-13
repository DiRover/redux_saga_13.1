import {
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
  CHANGE_SEARCH_FIELD,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
};

export default function skillsReducer(state = initialState, action) {
  switch (action.type) { //экшен отправки запроса
    case SEARCH_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_SKILLS_FAILURE://экшен неудачного запроса
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case SEARCH_SKILLS_SUCCESS://экшен удачного запроса 
      const {items} = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    case CHANGE_SEARCH_FIELD://экшен изменения поля
      const {search} = action.payload;
      return !search ? {...state, items: [], search} : {...state, search};// чистим стейт, если ни чего не введено
    default:
      return state;
  }
}
