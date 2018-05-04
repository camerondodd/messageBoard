import {storage} from '../firebase';
export const FETCH_DOCS = 'fetch_docs';

export function getDocs(){
	return dispatch => {
		storage.on('value', snapshot => {
			dispatch({
				type:FETCH_DOCS,
				payload:snapshot.val()
			})
		})
	}
};
export function saveDoc(doc){
	return dispatch => storage.put(doc)
	console.log('saveDoc ran');
};
export function deleteDoc(id){
	return dispatch => storage.child(id).remove();
};