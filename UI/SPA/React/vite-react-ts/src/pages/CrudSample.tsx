import * as React from 'react';
import constants from '../const';
import oauth_oidc from '../touryo/oauth_oidc';

// ===== 型定義 =====

interface DdlOption {
  label: string;
  value: string;
}

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

interface CrudSampleState {
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

export class CrudSample extends React.Component<Record<string, never>, CrudSampleState> {
  // ドロップダウンリストの選択肢（インスタンス変数）
  private ddlDap: DdlOption[];
  private ddlMode1: DdlOption[];
  private ddlMode2: DdlOption[];
  private ddlIso: DdlOption[];
  private ddlExRollback: DdlOption[];
  private ddlOrder: DdlOption[];
  private ddlOrderSequence: DdlOption[];

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

    // データアクセス制御クラス
    this.ddlDap = [
      { label: 'SQL Server / SQL Client', value: 'SQL' },
      { label: 'Multi-DB / OLEDB.NET', value: 'OLE' },
      { label: 'Multi-DB / ODBC.NET', value: 'ODB' },
      { label: 'Oracle / ODP.NET', value: 'ODP' },
      { label: 'DB2 / DB2.NET', value: 'DB2' },
      { label: 'HiRDB / HiRDB-DP', value: 'HIR' },
      { label: 'MySQL Cnn/NET', value: 'MCN' },
      { label: 'PostgreSQL / Npgsql', value: 'NPS' },
    ];
    // Daoモード
    this.ddlMode1 = [
      { label: '個別Dao', value: 'individual' },
      { label: '共通Dao', value: 'common' },
      { label: '自動生成Dao（更新のみ）', value: 'generate' },
    ];
    // 静的、動的のクエリ モード
    this.ddlMode2 = [
      { label: '静的クエリ', value: 'static' },
      { label: '動的クエリ', value: 'dynamic' },
    ];
    // 分離レベル
    this.ddlIso = [
      { label: 'ノットコネクト', value: 'NC' },
      { label: 'ノートランザクション', value: 'NT' },
      { label: 'ダーティリード', value: 'RU' },
      { label: 'リードコミット', value: 'RC' },
      { label: 'リピータブルリード', value: 'RR' },
      { label: 'シリアライザブル', value: 'SZ' },
      { label: 'スナップショット', value: 'SS' },
      { label: 'デフォルト', value: 'DF' },
    ];
    // コミット、ロールバックを設定
    this.ddlExRollback = [
      { label: '正常時', value: '-' },
      { label: '業務例外', value: 'Business' },
      { label: 'システム例外', value: 'System' },
      { label: 'その他、一般的な例外', value: 'Other' },
      { label: '業務例外への振替', value: 'Other-Business' },
      { label: 'システム例外への振替', value: 'Other-System' },
    ];
    // 並び替え対象列
    this.ddlOrder = [
      { label: 'c1', value: 'c1' },
      { label: 'c2', value: 'c2' },
      { label: 'c3', value: 'c3' },
    ];
    // 昇順・降順
    this.ddlOrderSequence = [
      { label: 'ASC', value: '' },
      { label: 'DESC', value: 'D' },
    ];

    // method を bind
    this.onChangeDdlDap = this.onChangeDdlDap.bind(this);
    this.onChangeDdlMode1 = this.onChangeDdlMode1.bind(this);
    this.onChangeDdlMode2 = this.onChangeDdlMode2.bind(this);
    this.onChangeDdlIso = this.onChangeDdlIso.bind(this);
    this.onChangeDdlExRollback = this.onChangeDdlExRollback.bind(this);
    this.onChangeDdlOrder = this.onChangeDdlOrder.bind(this);
    this.onChangeDdlOrderSequence = this.onChangeDdlOrderSequence.bind(this);

    this.onChangeShipperID = this.onChangeShipperID.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
  }

  // ===== render =====

  render() {
    const containerStyle: React.CSSProperties = { textAlign: 'left' };
    const div0Style: React.CSSProperties = {};
    const div1Style: React.CSSProperties = { display: 'inline-block' };
    const div2Style: React.CSSProperties = { display: 'inline-block' };

    let contents: React.ReactNode;
    if (this.state.loading) {
      contents = <p><em>...Table...</em></p>;
    } else {
      contents = this.renderTable(this.state.shippers);
    }

    return (
      <div style={containerStyle}>
        <h1>CRUD sample</h1>
        <p>This component demonstrates CRUD.</p>
        <div style={div0Style}>
          {this.renderDDL()}
        </div>
        <div style={div1Style}>
          {this.renderInput()}
        </div>
        <div style={div2Style}>
          {contents}
          <p>処理結果：{this.state.message}</p>
        </div>
        <div>
          <button className='btn-primary' onClick={() => { this.selectCount(); }}>SelectCount</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.selectAll_DT(); }}>SelectAll_DT</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.selectAll_DS(); }}>SelectAll_DS</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.selectAll_DR(); }}>SelectAll_DR</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.selectAll_DSQL(); }}>SelectAll_DSQL</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.select(); }}>Select</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.insert(); }}>Insert</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.update(); }}>Update</button>&nbsp;
          <button className='btn-primary' onClick={() => { this.delete(); }}>Delete</button>
        </div>
      </div>
    );
  }

  renderDDL() {
    const ddlStyle: React.CSSProperties = { width: '100%' };

    return (
      <table className='table'>
        <tbody style={ddlStyle}>
          <tr>
            <td>データアクセス制御クラス:</td>
            <td>
              <select value={this.state.ddl.ddlDap} onChange={this.onChangeDdlDap}>
                {this.ddlDap.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>Daoモード:</td>
            <td>
              <select value={this.state.ddl.ddlMode1} onChange={this.onChangeDdlMode1}>
                {this.ddlMode1.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>静的、動的のクエリ モード:</td>
            <td>
              <select value={this.state.ddl.ddlMode2} onChange={this.onChangeDdlMode2}>
                {this.ddlMode2.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>分離レベル:</td>
            <td>
              <select value={this.state.ddl.ddlIso} onChange={this.onChangeDdlIso}>
                {this.ddlIso.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>コミット、ロールバックを設定:</td>
            <td>
              <select value={this.state.ddl.ddlExRollback} onChange={this.onChangeDdlExRollback}>
                {this.ddlExRollback.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>並び替え対象列:</td>
            <td>
              <select value={this.state.ddl.ddlOrder} onChange={this.onChangeDdlOrder}>
                {this.ddlOrder.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>昇順・降順:</td>
            <td>
              <select value={this.state.ddl.ddlOrderSequence} onChange={this.onChangeDdlOrderSequence}>
                {this.ddlOrderSequence.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderInput() {
    const inputStyle: React.CSSProperties = { width: '100%' };

    return (
      <table className='table'>
        <tbody style={inputStyle}>
          <tr>
            <td>ShipperID：</td>
            <td>
              <p>
                <label>
                  <input type='text' id='txtShipperID' value={this.state.shipper.shipperID} onChange={this.onChangeShipperID} />
                </label>
              </p>
            </td>
          </tr>
          <tr>
            <td>CompanyName：</td>
            <td>
              <p>
                <label>
                  <input type='text' id='txtCompanyName' value={this.state.shipper.companyName} onChange={this.onChangeCompanyName} />
                </label>
              </p>
            </td>
          </tr>
          <tr>
            <td>Phone：</td>
            <td>
              <p>
                <label>
                  <input type='text' id='txtPhone' value={this.state.shipper.phone} onChange={this.onChangePhone} />
                </label>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderTable(shippers: ShipperState[]) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>ShipperID</th>
            <th>CompanyName</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {shippers.map(shipper => (
            <tr key={shipper.shipperID}>
              <td>{shipper.shipperID}</td>
              <td>{shipper.companyName}</td>
              <td>{shipper.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // ===== イベントハンドラ（DDL） =====

  onChangeDdlDap(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlDap: e.target.value } });
  }
  onChangeDdlMode1(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlMode1: e.target.value } });
  }
  onChangeDdlMode2(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlMode2: e.target.value } });
  }
  onChangeDdlIso(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlIso: e.target.value } });
  }
  onChangeDdlExRollback(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlExRollback: e.target.value } });
  }
  onChangeDdlOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlOrder: e.target.value } });
  }
  onChangeDdlOrderSequence(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ddl: { ...this.state.ddl, ddlOrderSequence: e.target.value } });
  }

  // ===== イベントハンドラ（テキスト入力） =====

  onChangeShipperID(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ shipper: { ...this.state.shipper, shipperID: e.target.value } });
  }
  onChangeCompanyName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ shipper: { ...this.state.shipper, companyName: e.target.value } });
  }
  onChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ shipper: { ...this.state.shipper, phone: e.target.value } });
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
