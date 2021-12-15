import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure } from '../actions/actionCreators';
import { CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST } from '../actions/actionTypes';
import { searchSkills } from '../api/api';

function filterChangeSearchAction({type, payload}) { // функция для фильтрации типа экшена
    return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== ''
}

// worker
function* handleChangeSearchSaga(action) { //воркер для обработки изменения поля
    yield put(searchSkillsRequest(action.payload.search));
}

// watcher
function* watchChangeSearchSaga() { //наблюдатель для воркера обработки изменения поля
    yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker
function* handleSearchSkillsSaga(action) { //воркер для поиска элемента
    try {
        const retryCount = 3; //сколько раз повториться запросу в случае неудачи
        const retryDelay = 1 * 1000; // ms время между повторными запросами
        const data = yield retry(retryCount, retryDelay, searchSkills, action.payload.search); // повторные запросы
        yield put(searchSkillsSuccess(data)); //диспатч в случае удачи
    } catch (e) {
        yield put(searchSkillsFailure(e.message)); //диспатч в случае неудачи
    }
}

// watcher
function* watchSearchSkillsSaga() { //наблюдатель для воркера поиска элемента
    yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export default function* rootSaga() { //корневая сага
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga); //можно было вызвать все саги через all
}