import apiClient from '../../util/apiClient';

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

const GET_MESSAGES = {
    query: `
        query getMessages {
            messages {
                _id
                body
                createdAt
                sentAt
                scheduledFor
                isRead
                student{
                    fullname
                    firstname
                    lastname
                }
            }
        }
    `
}

// Action creator
export function fetchMessageList() {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_MESSAGE_BEGIN });
            const { data } = await apiClient.post("/graphql", GET_MESSAGES);

            const {messages} = data.data;
            dispatch({ type: FETCH_MESSAGE_SUCCESS, payload: messages });

            return messages;
        } catch (error) {
            dispatch({ type: FETCH_MESSAGE_FAILURE, payload: error })
        }
    };
}