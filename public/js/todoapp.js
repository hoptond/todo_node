import React from 'react';
import ReactDOM from 'react-dom';
import './list';
import 'new.js';
import 'task.js'


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'this works'
        };
    }
    render() {
        return(
            <h1>Blue Todo</h1>
        )
    }
}

//dom stuff
ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
);