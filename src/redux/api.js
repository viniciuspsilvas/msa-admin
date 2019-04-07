class ReduxApi {
    constructor(appName, relativePath) {
      this.APP_NAME = appName;
      this.URL = `{relativePath}`
  
      this.GET_REQUEST = `${this.APP_NAME}/GET_REQUEST`;
      this.GET_SUCCESS = `${this.APP_NAME}/GET_SUCCESS`;
      this.GET_ERROR = `${this.APP_NAME}/GET_ERROR`;
      
      // NEEDS TO BE BOUND TO CURRENT CONTEXT
      this.reducer = this.reducer.bind(this);
      this.selectGlobal = this.selectGlobal.bind(this);
      this.makeSelectBase = this.makeSelectBase.bind(this);
      this.saga = this.saga.bind(this);
      this.get = this.get.bind(this);
    }
  
    getRequest() {
      return {
        type: this.GET_REQUEST
      };
    }
  
    getSuccess(data) {
      return {
        type: this.GET_SUCCESS,
        data
      };
    }
  
    getError(data) {
      return {
        type: this.GET_ERROR,
        data
      };
    }
  
    getRequestReducerHandler(state, action) {
      return state
        .set('requesting', true);
    }
  
    getSuccessReducerHandler(state, action) {
      return state
        .set('requesting', false)
        .set('initialized', true)
        .set('list', action.data);
    }
  
    getErrorReducerHandler(state, action) {
      return state
        .set('error', action.error)
        .set('requesting', false);
    }
  
    /*
    *
    * NOT INCLUDING GET (detail), POST, PUT, DELETE or PATCH, for sake of brevity
    *
    */
  
    reducer(state = fromJS({ list: [],
      detail: {},
      requesting: false,
      initialized: false,
    }), action) {
  
      switch (action.type) {
        case this.GET_REQUEST: {
          return getRequestReducerHandler(state, action);
        }
  
        case this.GET_SUCCESS: {
          return getSuccessReducerHandler(state, action)
        }
  
        case this.GET_ERROR: {
          return getErrorReducerHandler(state, action)
        }
  
        default:
          return state;
      }
    }
  
    * get(action = {}) {
      try {
        // Call using the request helper
        const resp = yield Axios.get(action.url || this.URL);
        yield put(this.getSuccess(resp.data, action.append));
      } catch (err) {
        yield put(this.getError(err));
      }
    }
  
    // Saga
    * saga() {
      yield all([
        takeLatest(this.GET_REQUEST, this.get),
      ]);
    }
  
    // Selectors
    selectGlobal(state) {
      return state.get(this.APP_NAME);
    }
  
    /*
    * Key corresponds to the redux state keys e.g. list, detail, etc.
    */
    makeSelectBase = (key) => {
      return createSelector(
        this.selectGlobal,
        (globalState) => globalState.get(key)
      );
    }
  }
  
  export default ReduxApi;