import {docDB} from '../firebase';
export const FETCH_DOCS = 'fetch_docs';

export function getDocs(){
	return dispatch => {
		docDB.on('value', snapshot => {
			dispatch({
				type:FETCH_DOCS,
				payload:snapshot.val()
			})
		})
	}
};
export function saveDoc(doc){
	return dispatch => docDB.push(doc)
};
export function deleteDoc(id){
	return dispatch => docDB.child(id).remove();
};