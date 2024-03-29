import * as defs from "../definitions/definitions";
import {Action, ActionTypes} from "../actions/actionTypes";
import {combineReducers, Reducer} from "redux";
import {connectRouter} from 'connected-react-router';
import {History} from "history";

const initialUserState: defs.State["users"] = null;

export const userReducer: Reducer<defs.State["users"], Action> = (state = initialUserState, action) => {
    switch(action.type)  {
        case ActionTypes.LOAD_USERS: {
            return action.users;
        }
    }
    return state;
};

const initialChannelState: defs.State["channels"] = null;

export const channelReducer: Reducer<defs.State["channels"], Action> = (state = initialChannelState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_CHANNELS: {
            return action.channels;
        }
    }
    return state;
}

export const createRootReducer = (history: History) => combineReducers<defs.State>({
    users: userReducer,
    channels: channelReducer,
    router: connectRouter(history)
});