import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
} from './actionTypes';
// создание экшенов
// экшен поиска
export const searchSkillsRequest = search => {
  return {
    type: SEARCH_SKILLS_REQUEST,
    payload: {search},//введеные символы поиска
  }
};
//поиск неудачен
export const searchSkillsFailure = error => {
  return {
    type: SEARCH_SKILLS_FAILURE,
    payload: {error},
  }
};
// поиск удачен
export const searchSkillsSuccess = items => {
  return {
    type: SEARCH_SKILLS_SUCCESS,
    payload: {items},
  }
};

export const changeSearchField = search => ({
  type: CHANGE_SEARCH_FIELD,
  payload: {search},
});