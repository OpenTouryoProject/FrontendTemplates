import * as React from 'react';
import 'isomorphic-fetch';
import {CrudSampleRootUrl} from '../const.js';
import CrudSample2DDL from './CrudSample2/CrudSample2DDL'
import CrudSample2Input from './CrudSample2/CrudSample2Input'
import CrudSample2Output from './CrudSample2/CrudSample2Output'
import CrudSample2Button from './CrudSample2/CrudSample2Button'

import oauth_oidc from '../touryo/oauth_oidc';

export class CrudSample2 extends React.Component {
    // constructor
    constructor() {
        super();

        this.state = {
            message : "",
            ddl : {
                ddlDap: "SQL",
                ddlMode1: "individual",
                ddlMode2: "static",
                ddlIso: "NT",
                ddlExRollback: "-",
                ddlOrder: "c1",
                ddlOrderSequence: "A"
            },
            shipper : {
                shipperID: "",
                companyName: "",
                phone: ""
            },
            shippers : 
            [
                {
                    shipperID: "",
                    companyName: "",
                    phone: ""
                }
            ],
            loading: true
        };
    }
    
    // render
    render() {

        const div0Style = { };

        const div1Style = {
            display : 'inline-block'
        };

        const div2Style = {
            display : 'inline-block'
        };

        return <div>
            <h1>CRUD sample</h1>
            <p>This component demonstrates CRUD.</p>
            <div style={div0Style}>
                <CrudSample2DDL onChangeDdl={e => this.receiveDDLChanged(e)} />
            </div>
            <div style={div1Style}>
                <CrudSample2Input shipper={this.state.shipper}
                onChangeInput={e => this.receiveInputChanged(e)} />
            </div>
            <div style={div2Style}>
                <CrudSample2Output loading={this.state.loading}
                 shippers={this.state.shippers}  message={this.state.message} />
            </div>
            <div>
                <CrudSample2Button onClickButton={e => this.receiveButtonClick(e)} />
            </div>
        </div>;
    }

    // event handler (JavaScript)

    // 子のイベントを受ける
    // - CrudSample2DDL
    receiveDDLChanged (ddl) {
        this.setState(ddl);
    }
    // - CrudSample2Input
    receiveInputChanged (shipper) {
        this.setState(shipper);
    }

    // - CrudSample2Button
    receiveButtonClick (actionType) {
        switch (actionType) {
            case 'SelectCount':
                this.selectCount();
                return;
            case 'SelectAll_DT':
                this.selectAll_DT();
                return;
            case 'SelectAll_DS':
                this.selectAll_DS();
                return;
            case 'SelectAll_DR':
                this.selectAll_DR();
                return;
            case 'SelectAll_DSQL':
                this.selectAll_DSQL();
                return;
            case 'Select':
                this.select();
                return;
            case 'Insert':
                this.insert();
                return;
            case 'Update':
                this.update();
                return;
            case 'Delete':
                this.delete();
                return;
            default:
                return;
        }
    }

    // event handler (WebAPI)
    selectCount() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectCount', {method, headers, body})
        .then(fetchStatusHandler) 
            .then(response => response.json())
            .then(data =>  {
            if(data.message) {
                    this.setState({ message : data.message });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    selectAll_DT() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DT', {method, headers, body})
        .then(fetchStatusHandler)     
            .then(response => response.json())
            .then(data =>  {
            if(data.result) {
                this.setState({
                            message : "",
                            shippers : data.result,
                            loading: false
                        });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    selectAll_DS() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DS', {method, headers, body})
        .then(fetchStatusHandler) 
            .then(response => response.json())
            .then(data =>  {
            if(data.result) {
                this.setState({
                            message : "",
                            shippers : data.result,
                            loading: false
                        });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    selectAll_DR() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DR', {method, headers, body})
        .then(fetchStatusHandler) 
            .then(response => response.json())
            .then(data =>  {
            if(data.result) {
                this.setState({
                            message : "",
                            shippers : data.result,
                            loading: false
                        });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    selectAll_DSQL() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback
            + "&orderColumn=" + this.state.ddl.ddlOrder
            + "&orderSequence=" + this.state.ddl.ddlOrderSequence;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DSQL', {method, headers, body})
        .then(fetchStatusHandler) 
            .then(response => response.json())
            .then(data =>  {
            if(data.result) {
                this.setState({
                            message : "",
                            shippers : data.result,
                            loading: false
                        });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    select() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: this.state.shipper.shipperID,
                companyName: "",
                phone: ""
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Select', {method, headers, body})
        .then(fetchStatusHandler) 
            .then(response => response.json())
            .then(data =>  {
            if(data.result) {
                this.setState({
                            shipper:{
                                shipperID: data.result.shipperID,
                                companyName: data.result.companyName,
                                phone: data.result.phone
                            }
                        });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    insert() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: '0',
                companyName: this.state.shipper.companyName,
                phone: this.state.shipper.phone
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Insert', {method, headers, body})
        .then(fetchStatusHandler)   
            .then(response => response.json())
            .then(data =>  {
            if(data.message) {
                    this.setState({ message : data.message });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    update() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: this.state.shipper.shipperID,
                companyName: this.state.shipper.companyName,
                phone: this.state.shipper.phone
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Update', {method, headers, body})
        .then(fetchStatusHandler)
            .then(response => response.json())
            .then(data =>  {
            if(data.message) {
                    this.setState({ message : data.message });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
    delete() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: this.state.shipper.shipperID,
                companyName: "",
                phone: ""
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Delete', {method, headers, body})
        .then(fetchStatusHandler)
            .then(response => response.json())
            .then(data =>  {
            if(data.message) {
                    this.setState({ message : data.message });
                }
            else if(data.errorMSG) {
                    this.setState({ message : JSON.stringify(data.errorMSG) });
                }
            else if(data.exceptionMSG) {
                    this.setState({ message : JSON.stringify(data.exceptionMSG) });
                }
            })
            .catch(
                // 異常系
                error => {
                    this.setState({ message : JSON.stringify(error.stack) });
                }
            );
    }
}

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