const initialState = {
  isLoading: false,
}

const FetchDataReducer = (state = initialState, action) => {

  var newState = null;
  
  switch (action.type) {
    
    case 'PRE_REQUEST':
      // stateを複製して
      newState = Object.assign({}, state);
      // isLoadingをtrueにする
      newState = {
        isLoading: true,
      };

      return newState;
      
    case 'REQUEST_SUCCESS':
    
      console.log("REQUEST_SUCCESS: " + JSON.stringify(action.forecasts));

      // stateを複製して
      newState = Object.assign({}, state);
      // isLoadingをfalseにして、値をセット。
      newState = {
        isLoading: false,
        forecasts: action.forecasts,
        startDateIndex: action.startDateIndex
      };

      return newState;

    case 'REQUEST_FAILURE':
      // stateを複製して
      newState = Object.assign({}, state);
      // isLoadingをfalseにして、値をセット。
      newState = {
        isLoading: false,
        error: action.error
      };

      return newState;

    default:
      return state
  }
};
    
export default FetchDataReducer;