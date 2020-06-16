const initialState = {
  ddl : {
    ddlDap: "SQL",
    ddlMode1: "individual",
    ddlMode2: "static",
    ddlIso: "NT",
    ddlExRollback: "-",
    ddlOrder: "c1",
    ddlOrderSequence: "A"
  },
  message : "",
  shipper : {
    shipperID: "",
    companyName: "",
    phone: ""
  }
}

const CrudSample2Reducer = (state = initialState, action) => {

  // stateを複製して
  let newState = null;

  switch (action.type) {

    case 'CHANGE_DDL_DAP':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlDap: action.ddl.ddlDap,
        },
      };

      return newState;

    case 'CHANGE_DDL_MODE1':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlMode1: action.ddl.ddlMode1,
        },
      };

      return newState;

    case 'CHANGE_DDL_MODE2':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlMode2: action.ddl.ddlMode2,
        },
      };

      return newState;

    case 'CHANGE_DDL_ISO':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlIso: action.ddl.ddlIso,
        },
      };

      return newState;

    case 'CHANGE_DDL_EXROLLBACK':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlExRollback: action.ddl.ddlExRollback,
        },
      };

      return newState;

    case 'CHANGE_DDL_ORDER':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlOrder: action.ddl.ddlOrder,
        },
      };

      return newState;

    case 'CHANGE_DDL_ORDERSEQUENCE':
      // 値をセット。
      newState = {
        ...state,
        ddl: {
          ...state.ddl,
          ddlOrderSequence: action.ddl.ddlOrderSequence,
        },
      };

      return newState;

      //////////////////////////////////////////////////

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
    
export default CrudSample2Reducer;