import React from 'react';
import ReactDOM from 'react-dom';
import 'list.js';
import 'new.js';
import 'task.js'


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }
    render() {

    }
}

//dom stuff
ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
);