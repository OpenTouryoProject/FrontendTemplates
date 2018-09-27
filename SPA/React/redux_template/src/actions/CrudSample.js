import {CrudSampleRootUrl} from '../const.js';

// fetchの開始前
export const PRE_REQUEST = () => {
  return {
    type: 'PRE_REQUEST'
  }
};

// fetchの失敗
export const REQUEST_FAILURE = (error) => {
  return {
    type: 'REQUEST_FAILURE',
    message: error
  }
};

/*
  message : state.CrudSampleReducer.message,
  shipper : state.CrudSampleReducer.shipper,
  shippers : state.CrudSampleReducer.shippers,
  loading: state.CrudSampleReducer.loading
*/

// fetchの成功
export const SELECT_COUNT_SUCCESS = (message) => {
  return {
    type: 'SELECT_COUNT_SUCCESS',
    message: message
  }
};

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
    .then(response => response.json())
    .then(data => 
      {
        console.log("SELECT_COUNT_ASYNC: " + JSON.stringify(data));

        if(data.Message)
        {
          dispatch(SELECT_COUNT_SUCCESS(data.Message));
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
        dispatch(REQUEST_FAILURE(error));
      }
    );
  }
}