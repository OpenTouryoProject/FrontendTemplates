import {CrudSampleRootUrl} from '../const.js';
import oauth_oidc from '../touryo/oauth_oidc';

// CHANGE
export const CHANGE_SHIPPER_SHIPPERID = (e) => {
  return { 
    type: 'CHANGE_SHIPPER_SHIPPERID',
    shipper: {shipperID: e.target.value}
  };
};
export const CHANGE_SHIPPER_COMPANYNAME = (e) => {
  return { 
    type: 'CHANGE_SHIPPER_COMPANYNAME',
    shipper: {companyName: e.target.value}
  };
};
export const CHANGE_SHIPPER_PHONE = (e) => {
  return { 
    type: 'CHANGE_SHIPPER_PHONE',
    shipper: {phone: e.target.value}
  };
};

//////////

// fetchの開始前
export const PRE_REQUEST = () => {
  return {
    type: 'PRE_REQUEST'
  };
};

// fetchの成功
export const REQUEST_SUCCESS = (message) => {
  return {
    type: 'REQUEST_SUCCESS',
    message: message
  };
};

// fetchの失敗
export const REQUEST_FAILURE = (error) => {
  return {
    type: 'REQUEST_FAILURE',
    message: error
  };
};

// SELECT_COUNT
// fetchのルート
export const SELECT_COUNT_ASYNC = (ddl) => {
  return (dispatch) => {

    // URL
    let url = CrudSampleRootUrl + 'SelectCount';

    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(false);
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'SelectCount', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.message) {
          dispatch(REQUEST_SUCCESS(data.message));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

// SELECT_ALL
// fetchの成功
export const SELECT_ALL_SUCCESS = (shippers) => {
  return {
    type: 'SELECT_ALL_SUCCESS',
    shippers: shippers
  };
};
// SELECT_ALL_DT
// fetchのルート
export const SELECT_ALL_DT_ASYNC = (ddl) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(false);
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'SelectAll_DT', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
          dispatch(SELECT_ALL_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};
// SELECT_ALL_DS
// fetchのルート
export const SELECT_ALL_DS_ASYNC = (ddl) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(false);
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'SelectAll_DS', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
          dispatch(SELECT_ALL_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};
// SELECT_ALL_DR
// fetchのルート
export const SELECT_ALL_DR_ASYNC = (ddl) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(false);
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'SelectAll_DR', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
          dispatch(SELECT_ALL_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};
// SELECT_ALL_DSQL
// fetchのルート
export const SELECT_ALL_DSQL_ASYNC = (ddl) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(false);
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback
        + "&OrderColumn=" + ddl.ddlOrder
        + "&OrderSequence=" + ddl.ddlOrderSequence;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DSQL', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
          dispatch(SELECT_ALL_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

// SELECT
// fetchの成功
export const SELECT_SUCCESS = (shipper) => {
  return {
    type: 'SELECT_SUCCESS',
    shipper: shipper
  };
};
// fetchのルート
export const SELECT_ASYNC = (ddl, shipper) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      shipper: {
          shipperID: shipper.shipperID,
          companyName: "",
          phone: ""
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'Select', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
          dispatch(SELECT_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

// INSERT
// fetchのルート
export const INSERT_ASYNC = (ddl, shipper) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      shipper: {
          shipperID: shipper.shipperID,
          companyName: shipper.companyName,
          phone: shipper.phone
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'Insert', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.message) {
          dispatch(REQUEST_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

// UPDATE
// fetchのルート
export const UPDATE_ASYNC = (ddl, shipper) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      shipper: {
          shipperID: shipper.shipperID,
          companyName: shipper.companyName,
          phone: shipper.phone
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'Update', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.message) {
          dispatch(REQUEST_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

// DELETE
// fetchのルート
export const DELETE_ASYNC = (ddl, shipper) => {
  return (dispatch) => {
    // リクエストの生成
    const method = "POST";
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      shipper: {
          shipperID: shipper.shipperID,
          companyName: '',
          phone: '',
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(CrudSampleRootUrl + 'Delete', {method, headers, body})
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => {
        if(data.message) {
          dispatch(REQUEST_SUCCESS(data.result));
        }
        else if(data.errorMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.errorMSG)));
        }
        else if(data.exceptionMSG) {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.exceptionMSG)));
        }
    })
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

function createHttpRequestHeader(isJsonRpc) {
  let headers = { };

  if(isJsonRpc) {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }
  else {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  let access_token = oauth_oidc.getAccessToken();
  if(access_token) {
    headers.Authorization = "Bearer " + access_token;
  }
  
  return headers;
}

// https://github.com/github/fetch/issues/155#issuecomment-108353192
function fetchStatusHandler(response) {
  if (response.status === 200) {
      return response;
  }
  else {
      throw new Error(response.statusText);
  }
}