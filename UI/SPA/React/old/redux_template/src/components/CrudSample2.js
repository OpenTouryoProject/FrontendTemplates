import * as React from 'react';

export default class CrudSample2 extends React.Component {
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
        // Connectを外したので呼ばれない。
        // return (<div>bbbb</div>);
    }
}