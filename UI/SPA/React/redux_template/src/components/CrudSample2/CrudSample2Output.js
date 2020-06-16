import * as React from 'react';

export default class CrudSample2Output extends React.Component {
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

        let table = null;
        let shippers = this.props.shippers;

        if(!this.props.shippers)
        {
            table = <p><em>...Table...</em></p>;
        }
        else
        {
            table = <table className='table'>
                <thead>
                    <tr>
                        <th>ShipperID</th>
                        <th>CompanyName</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                {shippers.map(shipper =>
                    <tr key={ shipper.shipperID }>
                        <td>{ shipper.shipperID }</td>
                        <td>{ shipper.companyName }</td>
                        <td>{ shipper.phone }</td>
                    </tr>
                )}
                </tbody>
            </table>; 
        }

        return <div style={divStyle}>
            { table }
            <p>処理結果：{this.props.message}</p>
        </div>;
    }
}