import * as React from 'react';

export class CrudSample2Output extends React.Component {
    // constructor
    constructor(props) {
        super(props);

        this.state = {
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

    // lifecycle
    componentWillReceiveProps(newProps) {
        //JSON.stringify(newProps);
        this.setState({loading: newProps.loading});
        this.setState({shippers: newProps.shippers});
        this.setState({message: newProps.message});
    }

    // render
    render() {
        
        let contents = null;
        if(this.state.loading)
        {
            contents = <p><em>...Table...</em></p>;
        }
        else
        {
            contents = <table className='table'>
                <thead>
                    <tr>
                        <th>ShipperID</th>
                        <th>CompanyName</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.shippers.map(shipper =>
                    <tr key={ shipper.shipperID }>
                        <td>{ shipper.shipperID }</td>
                        <td>{ shipper.companyName }</td>
                        <td>{ shipper.phone }</td>
                    </tr>
                )}
                </tbody>
            </table>; 
        }

        return <div>
            { contents }
            <p>処理結果：{this.state.message}</p>
        </div>;
    }

    // event handler (JavaScript)
}

export default CrudSample2Output;