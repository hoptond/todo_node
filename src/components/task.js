import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //tasks is an array of objects, each with an id and desc properties
            id: props.id,
            desc: props.desc
        };
    }

    render() {
        return (
            <li>
                <input type="checkbox" id={this.state.id} name={this.state.id}/>
                    <span>{this.state.desc}</span>
            </li>
        );
    }
}

export default Task