import React, { Component } from 'react';

class Task extends Component {
    render() {
        return (
            <li>
                <input type="checkbox" id={this._id} name={this._id}/>
                    <span>{this.desc}</span>
            </li>
        );
    }
}

export default Task