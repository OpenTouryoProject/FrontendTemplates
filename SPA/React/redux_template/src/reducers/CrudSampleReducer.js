const initialState = {
  message : "",
  isLoading: false
}

const CrudSampleReducer = (state = initialState, action) => {

  var newState = null;
  
  switch (action.type) {
    
    case 'PRE_REQUEST':
      // stateを複製して
      newState = Object.assign({}, state);
      // isLoadingをtrueにする
      newState = {
        isLoading: true,
        message : ""
      };

      return newState;
      
    case 'REQUEST_FAILURE':
      // stateを複製して
      newState = Object.assign({}, state);
      // isLoadingをfalseにして、値をセット。
      newState = {
        isLoading: false,
        message: action.message
      };

      return newState;

    case 'SELECT_COUNT_SUCCESS':
    
      console.log("REQUEST_SUCCESS: " + JSON.stringify(action));

      // stateを複製して
      newState = Object.assign({}, state);
      // isLoadingをfalseにして、値をセット。
      newState = {
        isLoading: false,
        message: action.message
      };

      return newState;
      
    default:
      return state
  }
};
    
export default CrudSampleReducer;