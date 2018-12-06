import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //tasks is an array of objects, each with an id and desc properties
            tasks: props.tasks
        };
    }

    render() {
        return (
            <div>
                <ul className="List">
                    {<li>test</li>}
                </ul>
            </div>
        );
    }
}

export default List