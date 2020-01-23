import apiClient from '../../util/apiClient';

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';

const GET_MESSAGES = {
    query: `
        query getMessages {
            messages {
                _id
                title
                body
                createdAt
                sentAt
                scheduledFor
                isRead
                student{
                    fullname
                    firstname
                    lastname
                    email
                }
            }
        }
    `
}

const DELETE_MESSAGE = `
mutation deleteMessage($id:ID!) {
    deleteMessage (_id : $id){
      _id
    }
  }
`

// Action creator
export function fetchMessageList() {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_MESSAGE_BEGIN });
            const { data } = await apiClient.post("/graphql", GET_MESSAGES);

            const { messages } = data.data;
            dispatch({ type: FETCH_MESSAGE_SUCCESS, payload: messages });

            return messages;
        } catch (error) {
            dispatch({ type: FETCH_MESSAGE_FAILURE, payload: error })
        }
    };
}

export const deleteMessage = id => async dispatch => {
    try {
        dispatch({ type: FETCH_MESSAGE_BEGIN });

        // fetch data from a url endpoint
        var { data } = await apiClient
            .post("/graphql", {
                query: DELETE_MESSAGE,
                variables: { id }
            })

        if (data.errors) {
            dispatch({ type: FETCH_MESSAGE_FAILURE, payload: data.errors[0].message })
        } else {
            dispatch({ type: DELETE_MESSAGE_SUCCESS });
        }

        return data;
    } catch (error) {
        dispatch({ type: FETCH_MESSAGE_FAILURE, payload: error })
    }
}