import * as React from 'react';

export default class CrudSample2Button extends React.Component {
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
        return <div>
          <button className='btn' onClick={ () => { this.props.SELECT_COUNT_ASYNC(this.props.ddl) } }>SelectCount</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.SELECT_ALL_DT_ASYNC(this.props.ddl) } }>SelectAll_DT</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.SELECT_ALL_DS_ASYNC(this.props.ddl) } }>SelectAll_DS</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.SELECT_ALL_DR_ASYNC(this.props.ddl) } }>SelectAll_DR</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.SELECT_ALL_DSQL_ASYNC(this.props.ddl) } }>SelectAll_DSQL</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.SELECT_ASYNC(this.props.ddl, this.props.shipper) } }>Select</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.INSERT_ASYNC(this.props.ddl, this.props.shipper) } }>Insert</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.UPDATE_ASYNC(this.props.ddl, this.props.shipper) } }>Update</button>&nbsp;
          <button className='btn' onClick={ () => { this.props.DELETE_ASYNC(this.props.ddl, this.props.shipper) } }>Delete</button>
        </div>       
    }
}