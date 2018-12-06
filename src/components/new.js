import React, { Component } from 'react';

class NewTask extends Component {
    render() {
        return (
            <form method="post" action="todos/new">
                <li>
                    <input name="desc" type="text" placeholder="Enter a new task here..."/>
                        <input type="submit" value="SUBMIT"/>
                </li>
            </form>
        );
    }
}

export default NewTask