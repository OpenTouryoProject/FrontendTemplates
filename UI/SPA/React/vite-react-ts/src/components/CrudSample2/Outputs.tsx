import * as React from 'react';

// 型定義
interface Shipper {
  shipperID: string;
  companyName: string;
  phone: string;
}

interface OutputsProps {
  shippers: Shipper[];
  loading: boolean;
  message?: string;
}

interface OutputsState {
  shippers: Shipper[];
  loading: boolean;
  message?: string;
}

export class Outputs extends React.Component<OutputsProps, OutputsState> {
  // constructor
  constructor(props: OutputsProps) {
    super(props);

    this.state = {
      shippers: [
        {
          shipperID: '',
          companyName: '',
          phone: '',
        },
      ],
      loading: true,
      message: undefined,
    };
  }

  // lifecycle
  // componentWillReceiveProps は非推奨のため getDerivedStateFromProps に移行
  static getDerivedStateFromProps(
    newProps: OutputsProps
  ): OutputsState {
    return {
      loading: newProps.loading,
      shippers: newProps.shippers,
      message: newProps.message,
    };
  }

  // render
  render() {
    let contents: React.ReactNode = null;

    if (this.state.loading) {
      contents = (
        <p>
          <em>...Table...</em>
        </p>
      );
    } else {
      contents = (
        <table className="table">
          <thead>
            <tr>
              <th>ShipperID</th>
              <th>CompanyName</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shippers.map((shipper) => (
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

    return (
      <div>
        {contents}
        <p>処理結果：{this.state.message}</p>
      </div>
    );
  }
}

export default Outputs;