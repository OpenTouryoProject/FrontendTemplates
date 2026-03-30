import * as React from 'react';

export class CrudSample2Input extends React.Component {
    // constructor
    constructor(props) {
        super(props);

        this.state = {
            shipper : {
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
    componentWillReceiveProps(newProps) {
        //JSON.stringify(newProps);
        this.setState({shipper: newProps.shipper});
    }

    // render
    render() {
        const inputStyle = {
            width:"100%"
        };

        return <table className='table'>
            <tbody style={inputStyle}>
                <tr>
                    <td>ShipperID：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtShipperID" value={this.state.shipper.shipperID} onChange={this.onChangeShipperID}/>
                            </label>
                        </p>            
                    </td>
                </tr>
                <tr>
                    <td>CompanyName：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtCompanyName" value={this.state.shipper.companyName} onChange={this.onChangeCompanyName}/>
                            </label>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>Phone：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtPhone" value={this.state.shipper.phone} onChange={this.onChangePhone}/>
                            </label>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>;
    }
    
    // event handler (JavaScript)

    // input type text
    onChangeShipperID(e){
        this.props.onChangeInput({shipper: { ...this.state.shipper, shipperID: e.target.value }});
    }
    onChangeCompanyName(e){
        this.props.onChangeInput({shipper: { ...this.state.shipper, companyName: e.target.value }});
    }
    onChangePhone(e){
        this.props.onChangeInput({shipper: { ...this.state.shipper, phone: e.target.value }});
    }
}

export default CrudSample2Input;