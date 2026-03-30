import * as React from 'react';

export default class CrudSample2Input extends React.Component {
    // constructor
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // 初回実行
    }

    componentWillReceiveProps(nextProps) {
        // route paramsなど、param変更時
    }

    // render
    render() {
        const divStyle = {
            display : 'inline-block'
        };

        const inputStyle = {
            width:"100%"
        };

        let shipper = this.props.shipper;

        if(!shipper)
        {
            shipper = {
                shipperID: "",
                companyName: "",
                phone: ""
            }
        }

        return <div style={divStyle}>
            <table className='table'>
                <tbody style={inputStyle}>
                    <tr>
                        <td>ShipperID：</td>
                        <td>
                            <p>
                                <label>
                                    <input type="text" id="txtShipperID" value={shipper.shipperID}
                                        defaultValue={shipper.shipperID} onChange={this.props.CHANGE_SHIPPER_SHIPPERID}/>
                                </label>
                            </p>            
                        </td>
                    </tr>
                    <tr>
                        <td>CompanyName：</td>
                        <td>
                            <p>
                                <label>
                                    <input type="text" id="txtCompanyName" value={shipper.companyName}
                                        defaultValue={shipper.companyName} onChange={this.props.CHANGE_SHIPPER_COMPANYNAME}/>
                                </label>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Phone：</td>
                        <td>
                            <p>
                                <label>
                                    <input type="text" id="txtPhone" value={shipper.phone}
                                        defaultValue={shipper.phone} onChange={this.props.CHANGE_SHIPPER_PHONE}/>
                                </label>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}