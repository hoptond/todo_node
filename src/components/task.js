import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
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