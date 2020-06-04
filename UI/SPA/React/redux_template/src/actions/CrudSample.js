import {CrudSampleRootUrl} from '../const.js';

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
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Message)
        {
          dispatch(REQUEST_SUCCESS(data.Message));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'SelectAll_DT';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Result)
        {
          dispatch(SELECT_ALL_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'SelectAll_DS';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Result)
        {
          dispatch(SELECT_ALL_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'SelectAll_DR';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 
        "ddlDap=" + ddl.ddlDap
        + "&ddlMode1=" + ddl.ddlMode1
        + "&ddlMode2=" + ddl.ddlMode2
        + "&ddlExRollback=" + ddl.ddlExRollback;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Result)
        {
          dispatch(SELECT_ALL_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'SelectAll_DSQL';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
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
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Result)
        {
          dispatch(SELECT_ALL_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'Select';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      Shipper: {
          ShipperID: shipper.shipperID,
          CompanyName: "",
          Phone: ""
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Result)
        {
          dispatch(SELECT_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'Insert';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      Shipper: {
          ShipperID: shipper.shipperID,
          CompanyName: shipper.companyName,
          Phone: shipper.phone,
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Message)
        {
          dispatch(REQUEST_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'Update';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      Shipper: {
          ShipperID: shipper.shipperID,
          CompanyName: shipper.companyName,
          Phone: shipper.phone,
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Message)
        {
          dispatch(REQUEST_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
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

    // URL
    let url = CrudSampleRootUrl + 'Delete';

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      ddlDap: ddl.ddlDap,
      ddlMode1: ddl.ddlMode1,
      ddlMode2: ddl.ddlMode2,
      ddlExRollback: ddl.ddlExRollback,
      Shipper: {
          ShipperID: shipper.shipperID,
          CompanyName: '',
          Phone: '',
      }
    });

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Message)
        {
          dispatch(REQUEST_SUCCESS(data.Result));
        }
        else if(data.ErrorMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ErrorMSG)));
        }
        else if(data.ExceptionMSG)
        {
          dispatch(REQUEST_FAILURE(JSON.stringify(data.ExceptionMSG)));
        }
      }
    )
    .catch(
      // 異常系
      error => {
        dispatch(REQUEST_FAILURE(error.stack));
      }
    );
  };
};

// https://github.com/github/fetch/issues/155#issuecomment-108353192
function fetchStatusHandler(response) {
  if (response.status === 200) {
      return response;
  }
  else {
      throw new Error(response.statusText);
  }
}