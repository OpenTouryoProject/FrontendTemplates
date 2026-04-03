import * as React from 'react';

// Propsの型定義
interface ButtonsProps {
    onClickButton: (actionType: string) => void;
}

export class Buttons extends React.Component<ButtonsProps> {
    constructor(props: ButtonsProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <button className='btn' onClick={() => { this.onClickButton('SelectCount') }}>SelectCount</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('SelectAll_DT') }}>SelectAll_DT</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('SelectAll_DS') }}>SelectAll_DS</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('SelectAll_DR') }}>SelectAll_DR</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('SelectAll_DSQL') }}>SelectAll_DSQL</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('Select') }}>Select</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('Insert') }}>Insert</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('Update') }}>Update</button>&nbsp;
                <button className='btn' onClick={() => { this.onClickButton('Delete') }}>Delete</button>
            </div>
        );
    }

    onClickButton(actionType: string): void {
        this.props.onClickButton(actionType);
    }
}

export default Buttons;
