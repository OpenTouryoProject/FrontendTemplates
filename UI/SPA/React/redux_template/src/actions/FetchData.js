import {FetchDataRootUrl} from '../const.js';

// fetchの開始前
export const PRE_REQUEST = () => {
  return {
    type: 'PRE_REQUEST'
  }
};

// fetchの成功
export const REQUEST_SUCCESS = (data, startDateIndex) => {
  return {
    type: 'REQUEST_SUCCESS',
    forecasts: data,
    startDateIndex: startDateIndex
  }
};

// fetchの失敗
export const REQUEST_FAILURE = (error) => {
  return {
    type: 'REQUEST_FAILURE',
    error: error
  }
};

// fetchのルート
export const GET_DATA_ASYNC = (startDateIndex) => {
  return (dispatch) => {

    // URL
    let url = FetchDataRootUrl + "startDateIndex=" + startDateIndex;

    // リクエスト開始前処理
    dispatch(PRE_REQUEST());

    // fetchする。
    fetch(url)　
    .then(response => response.json())
    .then(data => 
      {
        dispatch(REQUEST_SUCCESS(data, startDateIndex));
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