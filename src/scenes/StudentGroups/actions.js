import apiClient from '../../util/apiClient';

export const FETCH_STUDENTS_GROUP_BEGIN = 'FETCH_STUDENTS_GROUP_BEGIN';
export const FETCH_STUDENTS_GROUP_SUCCESS = 'FETCH_STUDENTS_GROUP_SUCCESS';
export const FETCH_STUDENTS_GROUP_FAILURE = 'FETCH_STUDENTS_GROUP_FAILURE';

export const CREATE_STUDENTS_GROUP = 'CREATE_STUDENTS_GROUP';
export const CREATE_STUDENTS_GROUP_SUCCESS = 'CREATE_STUDENTS_GROUP_SUCCESS';
export const CREATE_STUDENTS_GROUP_FAILURE = 'CREATE_STUDENTS_GROUP_FAILURE';
export const RESET_NEW_STUDENTS_GROUP = 'RESET_NEW_STUDENTS_GROUP';

export const DELETE_STUDENTS_GROUP_SUCCESS = 'DELETE_STUDENTS_GROUP_SUCCESS';


const CREATE_COURSE = `
mutation createCourse($course:CourseInput!) {
    createCourse(input:$course) { 
    _id
    name
  }
}
`

const DELETE_COURSE = `
mutation deleteCourse($id:ID!) {
    deleteCourse (_id : $id){
      _id
      name
    }
  }
`

const UPDATE_COURSE = `
mutation deleteCourse($id:ID!, $name:String!, $description:String ) {
    updateCourseNameDesc(_id:$id, name:$name, description : $description ) {
      _id
      name
    }
  }
`

const GET_COURSES = {
    query: `
        query getCourses {
            courses {
                _id
                name
                description
                enrollments {
                    _id
                    student {
                        _id
                        fullname
                        firstname
                        lastname
                        phone
                        email
                    }
                }
            }
        }
    `
}

// Action creator
export const fetchStudentGroupList = () => async dispatch => {
    try {
        dispatch({ type: FETCH_STUDENTS_GROUP_BEGIN });
        const { data } = await apiClient.post("/graphql", GET_COURSES);

        if (data.errors) throw new Error(data.errors[0].message);

        dispatch({ type: FETCH_STUDENTS_GROUP_SUCCESS, payload: data.data.courses });
        return data.data.courses;

    } catch (error) {
        dispatch({ type: FETCH_STUDENTS_GROUP_FAILURE, payload: error.message });
    }
}


export function createStudentGroup(studentGroup) {
    return async dispatch => {
        try {
            dispatch(createStudentGroupBegin());

            // fetch data from a url endpoint
            var resp
            if (studentGroup._id) {
                resp = await apiClient
                    .post("/graphql", {
                        query: UPDATE_COURSE,
                        variables: {
                            id: studentGroup._id,
                            name: studentGroup.name,
                            description: studentGroup.description
                        },
                    })

            } else {
                resp = await apiClient
                    .post("/graphql", {
                        query: CREATE_COURSE,
                        variables: {
                            course: studentGroup
                        },
                    })
            }

            dispatch(createStudentGroupSuccess(resp.data.data.createCourse));
            return resp.data;

        } catch (error) {
            dispatch(createStudentGroupFailure(error))
        }
    }
}


export function deleteStudentGroup(id) {
    return async dispatch => {
        try {
            dispatch(createStudentGroupBegin());

            // fetch data from a url endpoint
            var { data } = await apiClient
                .post("/graphql", {
                    query: DELETE_COURSE,
                    variables: {
                        id: id
                    },
                })

            /// tratar erro
            if (data.errors) {
                dispatch(createStudentGroupFailure(data.errors[0].message))
            } else {

                dispatch({ type: DELETE_STUDENTS_GROUP_SUCCESS });
            }

            return data;
        } catch (error) {
            dispatch(createStudentGroupFailure(error))
        }
    }
}

// Action
export const createStudentGroupBegin = () => ({
    type: CREATE_STUDENTS_GROUP
});

export function createStudentGroupSuccess(newPost) {
    return {
        type: CREATE_STUDENTS_GROUP_SUCCESS,
        payload: newPost
    };
}

export function createStudentGroupFailure(error) {
    return {
        type: CREATE_STUDENTS_GROUP_FAILURE,
        payload: error
    };
}

export function resetStudentGroup() {
    return {
        type: RESET_NEW_STUDENTS_GROUP
    }
};