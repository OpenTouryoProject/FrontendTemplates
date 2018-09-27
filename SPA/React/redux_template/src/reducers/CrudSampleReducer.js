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
  let newState = Object.assign({}, state);

  let shipperID = null;
  let companyName = null;
  let phone = null;

  if(newState.shipper)
  {
    shipperID = newState.shipper.shipperID || "";
    companyName = newState.shipper.companyName || "";
    phone = newState.shipper.phone || "";
  }

  switch (action.type) {
    case 'CHANGE_SHIPPER_SHIPPERID':
      // 値をセット。
      newState = {
        shipper: {
          shipperID: action.shipper.shipperID,
          companyName: companyName,
          phone: phone
        },
        shippers: newState.shippers
      };

      return newState;
    
    case 'CHANGE_SHIPPER_COMPANYNAME':
      // 値をセット。
      newState = {
        shipper: {
          shipperID: shipperID,
          companyName: action.shipper.companyName,
          phone: phone
        },
        shippers: newState.shippers
      };

      return newState;

    case 'CHANGE_SHIPPER_PHONE':
      // 値をセット。
      newState = {
        shipper: {
          shipperID: shipperID,
          companyName: companyName,
          phone: action.shipper.phone
        },
        shippers: newState.shippers
      };

      return newState;

      //////////////////////////////////////////////////

    case 'PRE_REQUEST':
      // 値をセット。
      newState = {
        message : "",
        shipper: {
          shipperID: shipperID,
          companyName: companyName,
          phone: phone
        },
        shippers: newState.shippers
      };

      return newState;

    case 'REQUEST_FAILURE':
      // 値をセット。
      newState = {
        message: action.message,
        shippers: newState.shippers
      };

      return newState;

    case 'REQUEST_SUCCESS':
      // 値をセット。
      newState = {
        message: action.message,
        shipper: {
          shipperID: shipperID,
          companyName: companyName,
          phone: phone
        },
        shippers: newState.shippers
      };

      return newState;

      //////////////////////////////////////////////////

    case 'SELECT_ALL_SUCCESS':
      // 値をセット。
      newState = {
        shipper: {
          shipperID: shipperID,
          companyName: companyName,
          phone: phone
        },
        shippers: action.shippers
      };

      return newState;

    case 'SELECT_SUCCESS':
      // 値をセット。
      newState = {
        shipper: 
        {
          shipperID: action.shipper.ShipperID,
          companyName: action.shipper.CompanyName,
          phone: action.shipper.Phone
        },
        shippers: newState.shippers
      };

      return newState;
      
    default:
      return state
  }
};
    
export default CrudSampleReducer;