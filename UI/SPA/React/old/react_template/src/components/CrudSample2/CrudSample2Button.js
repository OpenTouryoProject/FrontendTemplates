import * as React from 'react';

export class CrudSample2Button extends React.Component {
    // constructor
    constructor(props) {
        super(props);

        // Stateにアクセスするのでthis を指定のオブジェクトに束縛しておく。
        //this.onClickButton = this.onClickButton.bind(this);
    }

    // lifecycle

    // render
    render() {
        return <div>
            <button className='btn' onClick={ () => { this.onClickButton('SelectCount') } }>SelectCount</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('SelectAll_DT') } }>SelectAll_DT</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('SelectAll_DS') } }>SelectAll_DS</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('SelectAll_DR') } }>SelectAll_DR</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('SelectAll_DSQL') } }>SelectAll_DSQL</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('Select') } }>Select</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('Insert') } }>Insert</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('Update') } }>Update</button>&nbsp;
            <button className='btn' onClick={ () => { this.onClickButton('Delete') } }>Delete</button>
        </div>;
    }

    // event handler (JavaScript)
    onClickButton(actionType) {
        // 親のメソッドを呼び出す。
        this.props.onClickButton(actionType);
      }
}

export default CrudSample2Button;