import React from 'react'

// function App(props){
//     return (
//         <div>
//             <h1>{props.headerProp}</h1>
//             <h2>{props.contentProp}</h2>
//         </div>
//     )
// }

// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.headerProp}</h1>
//                 <h2>{this.props.contentProp}</h2>
//             </div>
//         )
//     }
// }

//! using states
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            header: 'header from state',
            content: 'content from state'
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.header}</h1>
                <h2>{this.state.content}</h2>
            </div>
        )
    }
}

// App.defaultProps = {
//     headerProp: "header here",
//     contentProp: "content here"
// }

export default App