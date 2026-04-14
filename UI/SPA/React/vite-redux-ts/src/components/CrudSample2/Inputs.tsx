import * as React from 'react';

// 型定義
interface Shipper {
    shipperID: string;
    companyName: string;
    phone: string;
}

interface InputsProps {
    shipper: Shipper;
    onChangeInput: (data: { shipper: Shipper }) => void;
}

interface InputsState {
    shipper: Shipper;
}

export class Inputs extends React.Component<InputsProps, InputsState> {
    // constructor
    constructor(props: InputsProps) {
        super(props);

        this.state = {
            shipper: {
                shipperID: "",
                companyName: "",
                phone: ""
            }
        };

        // method を bind
        // input type text
        this.onChangeShipperID = this.onChangeShipperID.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
    }

    // lifecycle
    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(newProps: InputsProps): void {
        this.setState({ shipper: newProps.shipper });
    }

    // render
    render(): React.ReactNode {
        const inputStyle: React.CSSProperties = {
            width: "100%"
        };

        return <table className='table'>
            <tbody style={inputStyle}>
                <tr>
                    <td>ShipperID：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtShipperID" value={this.state.shipper.shipperID} onChange={this.onChangeShipperID} />
                            </label>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>CompanyName：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtCompanyName" value={this.state.shipper.companyName} onChange={this.onChangeCompanyName} />
                            </label>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>Phone：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtPhone" value={this.state.shipper.phone} onChange={this.onChangePhone} />
                            </label>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>;
    }

    // event handler

    // input type text
    onChangeShipperID(e: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onChangeInput({ shipper: { ...this.state.shipper, shipperID: e.target.value } });
    }
    onChangeCompanyName(e: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onChangeInput({ shipper: { ...this.state.shipper, companyName: e.target.value } });
    }
    onChangePhone(e: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onChangeInput({ shipper: { ...this.state.shipper, phone: e.target.value } });
    }
}

export default Inputs;
