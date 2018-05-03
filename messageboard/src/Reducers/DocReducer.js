import {FETCH_DOCS} from '../Actions/DocActions';

export default function (state={}, action) {
	switch (action.type) {
		case FETCH_DOCS:
			return action.payload;
		default:
			return state;
	}
}