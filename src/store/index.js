import { createStore, combineReducers, applyMiddleware, compose, } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import skillsReducer from '../reducers/skills';
import { changeSearchEpic, searchSkillsEpic } from '../epics';

const reducer = combineReducers({ //собираем рэдьюсер
  skills: skillsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epic = combineEpics(//собираем эпик
  changeSearchEpic,
  searchSkillsEpic,
);

const epicMiddleware = createEpicMiddleware();//посредник обработки асинхранных запрсов

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(epicMiddleware)
));

epicMiddleware.run(epic);

export default store;
