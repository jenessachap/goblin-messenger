import * as types from './actionTypes.js';
import {dispatch} from 'react-redux';

// action to update the current login state (is a user logged in?)
export const loggedinState = (info) => ({
    type: types.LOGIN_STATE,
    payload: info
})

// action to login user
export const login = (user) => ({
    type: types.LOGIN,
    payload: user
})


// action to update signup state (does a user want to signup?)
export const signupState = (bool) => ({
    type: types.SIGNUP_STATE,
    payload: bool
})

// action to signup user (log them in)
export const signup = () => ({
    type: types.SIGNUP
})

// action to signup user (log them in)
export const view = (view) => ({
    type: types.VIEW,
    payload: view
})

// action to change infobox
export const userInfo = (info) => ({
    type: types.USER_INFO,
    payload: info
})

// action to change infobox
export const updateMessages = (messages) => ({
    type: types.UPDATE_MESSAGES,
    payload: messages
})


export const setConvoName = (convoName) => ({
    type: types.UPDATE_CONVO_NAME,
    payload: convoName
})

export function updateConvoMessages(convoName) {
    return function (dispatch, getState) {
        return fetch(`/messages/${convoName}`)
            .then(data => data.json())
            .then(data => {
            console.log(`are you here? ${data}`)
            dispatch({
                type: types.UPDATE_CONVO_MESSAGES,
                payload: data
                })  
            })
            .catch((error) => console.log(`there's an error: ${error}`))
    }     
}
// more functions

// export function bindComments(postId) {
//     return function(dispatch) {
//         return API.fetchComments(postId).then(comments => {
//             // dispatch
//             dispatch({
//                 type: BIND_COMMENTS,
//                 comments,
//                 postId
//             });
//         });
//     };
// }