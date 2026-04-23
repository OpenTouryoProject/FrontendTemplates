import common2 from './touryo/common';

type SuccessHandler = (data: Record<string, unknown>) => void;

/**
 * 共通のfetchラッパー（GET用）
 * @param url         リクエスト先URL
 * @param headers     HTTPヘッダー
 * @param onSuccess   成功時のハンドラ（data.errorMSG / data.exceptionMSG 以外の処理）
 * @param setMessage  メッセージをセットする関数
 */
export function getFetch(
  url: string,
  headers: HeadersInit,
  onSuccess: SuccessHandler,
  setMessage: (msg: string) => void,
): void {
  setMessage('');

  fetch(url, { method: 'GET', headers })
    .then(common2.fetchStatusHandler)
    .then(response => response.json())
    .then((data: Record<string, unknown>) => {
      if (data.errorMSG) {
        setMessage(JSON.stringify(data.errorMSG));
      } else if (data.exceptionMSG) {
        setMessage(JSON.stringify(data.exceptionMSG));
      } else {
        onSuccess(data);
      }
    })
    .catch((error: Error) => {
      setMessage(JSON.stringify(error.stack));
    });
}

/**
 * 共通のfetchラッパー（POST用）
 * @param url         リクエスト先URL
 * @param headers     HTTPヘッダー
 * @param body        リクエストボディ
 * @param onSuccess   成功時のハンドラ（data.errorMSG / data.exceptionMSG 以外の処理）
 * @param setMessage  メッセージをセットする関数
 */
export function postFetch(
  url: string,
  headers: HeadersInit,
  body: BodyInit,
  onSuccess: SuccessHandler,
  setMessage: (msg: string) => void,
): void {
  setMessage('');

  fetch(url, { method: 'POST', headers, body })
    .then(common2.fetchStatusHandler)
    .then(response => response.json())
    .then((data: Record<string, unknown>) => {
      if (data.errorMSG) {
        setMessage(JSON.stringify(data.errorMSG));
      } else if (data.exceptionMSG) {
        setMessage(JSON.stringify(data.exceptionMSG));
      } else {
        onSuccess(data);
      }
    })
    .catch((error: Error) => {
      setMessage(JSON.stringify(error.stack));
    });
}

// 全関数をオブジェクトとしてデフォルトエクスポート
const common = {
  getFetch,
  postFetch,
};

export default common;