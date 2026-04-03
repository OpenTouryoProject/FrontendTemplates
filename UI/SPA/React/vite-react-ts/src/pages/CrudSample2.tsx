import * as React from 'react';
import constants from '../const';
import oauth_oidc from '../touryo/oauth_oidc';
import DropDownLists from '../components/CrudSample2/DropDownLists';
import Inputs from '../components/CrudSample2/Inputs';
import Buttons from '../components/CrudSample2/Buttons';
import Outputs from '../components/CrudSample2/Outputs';

// ===== 型定義 =====

interface DdlState {
  ddlDap: string;
  ddlMode1: string;
  ddlMode2: string;
  ddlIso: string;
  ddlExRollback: string;
  ddlOrder: string;
  ddlOrderSequence: string;
}

interface ShipperState {
  shipperID: string;
  companyName: string;
  phone: string;
}

interface CrudSample2State {
  message: string;
  ddl: DdlState;
  shipper: ShipperState;
  shippers: ShipperState[];
  loading: boolean;
}

// ===== ヘルパー関数 =====

function createHttpRequestHeader(isJsonRpc: boolean): HeadersInit {
  let headers: Record<string, string>;

  if (isJsonRpc) {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  } else {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  const access_token = oauth_oidc.getAccessToken();
  if (access_token) {
    headers['Authorization'] = 'Bearer ' + access_token;
  }

  return headers;
}

// https://github.com/github/fetch/issues/155#issuecomment-108353192
function fetchStatusHandler(response: Response): Response {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}

// ===== コンポーネント =====

export class CrudSample2 extends React.Component<Record<string, never>, CrudSample2State>
{
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      message: '',
      ddl: {
        ddlDap: 'SQL',
        ddlMode1: 'individual',
        ddlMode2: 'static',
        ddlIso: 'NT',
        ddlExRollback: '-',
        ddlOrder: 'c1',
        ddlOrderSequence: 'A',
      },
      shipper: {
        shipperID: '',
        companyName: '',
        phone: '',
      },
      shippers: [
        {
          shipperID: '',
          companyName: '',
          phone: '',
        },
      ],
      loading: true,
    };
  }

  // ===== render =====

  render() {
    const containerStyle: React.CSSProperties = { textAlign: 'left' };
    const div0Style: React.CSSProperties = {};
    const div1Style: React.CSSProperties = { display: 'inline-block' };
    const div2Style: React.CSSProperties = { display: 'inline-block' };

    return (
      <div style={containerStyle}>
        <h1>CRUD sample</h1>
        <p>This component demonstrates CRUD.</p>
        <div style={div0Style}>
          <DropDownLists onChangeDdl={(e) => this.receiveDDLChanged(e)} />
        </div>
        <div style={div1Style}>
          <Inputs
            shipper={this.state.shipper}
            onChangeInput={(e) => this.receiveInputChanged(e)}
          />
        </div>
        <div style={div2Style}>
          <Outputs
            loading={this.state.loading}
            shippers={this.state.shippers}
            message={this.state.message}
          />
        </div>
        <div>
          <Buttons
            onClickButton={(e) => this.receiveButtonClick(e)}
          />
        </div>
      </div>
    );
  }

  // ─── 子コンポーネントからのイベント受信 ────────────────────

  receiveDDLChanged(ddl: Partial<CrudSample2State>): void {
    this.setState(ddl as CrudSample2State);
  }

  receiveInputChanged(shipper: Partial<CrudSample2State>): void {
    this.setState(shipper as CrudSample2State);
  }

  receiveButtonClick(actionType: string): void {
    switch (actionType) {
      case 'SelectCount':    this.selectCount();    return;
      case 'SelectAll_DT':   this.selectAll_DT();   return;
      case 'SelectAll_DS':   this.selectAll_DS();   return;
      case 'SelectAll_DR':   this.selectAll_DR();   return;
      case 'SelectAll_DSQL': this.selectAll_DSQL(); return;
      case 'Select':         this.select();         return;
      case 'Insert':         this.insert();         return;
      case 'Update':         this.update();         return;
      case 'Delete':         this.delete();         return;
      default:               return;
    }
  }

  // ===== WebAPI イベントハンドラ =====

  selectCount() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(false);
    const body =
      'ddlDap=' + this.state.ddl.ddlDap
      + '&ddlMode1=' + this.state.ddl.ddlMode1
      + '&ddlMode2=' + this.state.ddl.ddlMode2
      + '&ddlExRollback=' + this.state.ddl.ddlExRollback;

    fetch(constants.CrudSampleRootUrl + 'SelectCount', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          this.setState({ message: data.message });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  selectAll_DT() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(false);
    const body =
      'ddlDap=' + this.state.ddl.ddlDap
      + '&ddlMode1=' + this.state.ddl.ddlMode1
      + '&ddlMode2=' + this.state.ddl.ddlMode2
      + '&ddlExRollback=' + this.state.ddl.ddlExRollback;

    fetch(constants.CrudSampleRootUrl + 'SelectAll_DT', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          this.setState({ message: '', shippers: data.result, loading: false });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  selectAll_DS() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(false);
    const body =
      'ddlDap=' + this.state.ddl.ddlDap
      + '&ddlMode1=' + this.state.ddl.ddlMode1
      + '&ddlMode2=' + this.state.ddl.ddlMode2
      + '&ddlExRollback=' + this.state.ddl.ddlExRollback;

    fetch(constants.CrudSampleRootUrl + 'SelectAll_DS', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          this.setState({ message: '', shippers: data.result, loading: false });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  selectAll_DR() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(false);
    const body =
      'ddlDap=' + this.state.ddl.ddlDap
      + '&ddlMode1=' + this.state.ddl.ddlMode1
      + '&ddlMode2=' + this.state.ddl.ddlMode2
      + '&ddlExRollback=' + this.state.ddl.ddlExRollback;

    fetch(constants.CrudSampleRootUrl + 'SelectAll_DR', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          this.setState({ message: '', shippers: data.result, loading: false });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  selectAll_DSQL() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(false);
    const body =
      'ddlDap=' + this.state.ddl.ddlDap
      + '&ddlMode1=' + this.state.ddl.ddlMode1
      + '&ddlMode2=' + this.state.ddl.ddlMode2
      + '&ddlExRollback=' + this.state.ddl.ddlExRollback
      + '&orderColumn=' + this.state.ddl.ddlOrder
      + '&orderSequence=' + this.state.ddl.ddlOrderSequence;

    fetch(constants.CrudSampleRootUrl + 'SelectAll_DSQL', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          this.setState({ message: '', shippers: data.result, loading: false });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  select() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: this.state.ddl.ddlDap,
      ddlMode1: this.state.ddl.ddlMode1,
      ddlMode2: this.state.ddl.ddlMode2,
      ddlExRollback: this.state.ddl.ddlExRollback,
      shipper: {
        shipperID: this.state.shipper.shipperID,
        companyName: '',
        phone: '',
      },
    });

    fetch(constants.CrudSampleRootUrl + 'Select', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          this.setState({
            shipper: {
              shipperID: data.result.shipperID,
              companyName: data.result.companyName,
              phone: data.result.phone,
            },
          });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  insert() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: this.state.ddl.ddlDap,
      ddlMode1: this.state.ddl.ddlMode1,
      ddlMode2: this.state.ddl.ddlMode2,
      ddlExRollback: this.state.ddl.ddlExRollback,
      shipper: {
        shipperID: '0',
        companyName: this.state.shipper.companyName,
        phone: this.state.shipper.phone,
      },
    });

    fetch(constants.CrudSampleRootUrl + 'Insert', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          this.setState({ message: data.message });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  update() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: this.state.ddl.ddlDap,
      ddlMode1: this.state.ddl.ddlMode1,
      ddlMode2: this.state.ddl.ddlMode2,
      ddlExRollback: this.state.ddl.ddlExRollback,
      shipper: {
        shipperID: this.state.shipper.shipperID,
        companyName: this.state.shipper.companyName,
        phone: this.state.shipper.phone,
      },
    });

    fetch(constants.CrudSampleRootUrl + 'Update', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          this.setState({ message: data.message });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }

  delete() {
    this.setState({ message: '' });

    const method = 'POST';
    const headers = createHttpRequestHeader(true);
    const body = JSON.stringify({
      ddlDap: this.state.ddl.ddlDap,
      ddlMode1: this.state.ddl.ddlMode1,
      ddlMode2: this.state.ddl.ddlMode2,
      ddlExRollback: this.state.ddl.ddlExRollback,
      shipper: {
        shipperID: this.state.shipper.shipperID,
        companyName: '',
        phone: '',
      },
    });

    fetch(constants.CrudSampleRootUrl + 'Delete', { method, headers, body })
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          this.setState({ message: data.message });
        } else if (data.errorMSG) {
          this.setState({ message: JSON.stringify(data.errorMSG) });
        } else if (data.exceptionMSG) {
          this.setState({ message: JSON.stringify(data.exceptionMSG) });
        }
      })
      .catch((error: Error) => {
        this.setState({ message: JSON.stringify(error.stack) });
      });
  }
}
