import { USER_LIST_START, USER_LIST_SUCCESS, USER_LIST_FAIL } from '../../components/consts';
import { updateObject } from '../utility';

const initialState = {
	users: []
};

const getUserListStart = (state, action) => {
	return updateObject(state, {
		error: null,
        loading: true
    });
};

const getUserListSuccess = (state, action) => {
	return updateObject(state, {
		users: action.users,
        error: null,
        loading: false
    });
};

const getUserListFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LIST_START:
			return getUserListStart(state, action);
		case USER_LIST_SUCCESS:
			return getUserListSuccess(state, action);
		case USER_LIST_FAIL:
			return getUserListFail(state, action);
		default:
			return state;
	}
};

export default reducer;