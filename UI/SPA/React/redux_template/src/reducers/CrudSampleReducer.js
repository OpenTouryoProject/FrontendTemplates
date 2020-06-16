const initialState = {
  message : "",
  shipper : {
    shipperID: "",
    companyName: "",
    phone: ""
  }
}

const CrudSampleReducer = (state = initialState, action) => {

  // stateを複製して
  let newState = null;

  switch (action.type) {
    case 'CHANGE_SHIPPER_SHIPPERID':
      // 値をセット。
      newState = {
        ...state,
        shipper: {
          ...state.shipper,
          shipperID: action.shipper.shipperID,
        },
      };

      return newState;
    
    case 'CHANGE_SHIPPER_COMPANYNAME':
      // 値をセット。
      newState = {
        ...state,
        shipper: {
          ...state.shipper,
          companyName: action.shipper.companyName
        },
      };

      return newState;

    case 'CHANGE_SHIPPER_PHONE':
      // 値をセット。
      newState = {
        ...state,
        shipper: {
          ...state.shipper,
          phone: action.shipper.phone
        },
      };

      return newState;

      //////////////////////////////////////////////////

    case 'PRE_REQUEST':
      // 値をセット。
      newState = {
        ...state,
        message : "",
      };

      return newState;

    case 'REQUEST_FAILURE':
      // 値をセット。
      newState = {
        ...state,
        message: action.message,
      };

      return newState;

    case 'REQUEST_SUCCESS':
      // 値をセット。
      newState = {
        ...state,
        message: action.message,
      };

      return newState;

      //////////////////////////////////////////////////

    case 'SELECT_ALL_SUCCESS':
      // 値をセット。
      newState = {
        ...state,
        shippers: action.shippers
      };

      return newState;

    case 'SELECT_SUCCESS':
      // 値をセット。
      newState = {
        ...state,
        shipper: 
        {
          shipperID: action.shipper.shipperID,
          companyName: action.shipper.companyName,
          phone: action.shipper.phone
        },
      };

      return newState;
      
    default:
      return state
  }
};
    
export default CrudSampleReducer;