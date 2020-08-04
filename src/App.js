import React from 'react';
import './App.css';

// Components
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";

// Firebase
import base from './base';

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            pseudo: this.props.match.params.pseudo,
        }
    }

    // Create messages ref on the div
    messageRef = React.createRef()

    addMessage = (message) => {
        const messages = { ... this.state.messages }
        messages[`message-${Date.now()}`] = message;
        this.setState({
            messages: messages
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const ref = this.messageRef.current;
        ref.scrollTop = ref.scrollHeight;
    }

    componentDidMount() {
        base.syncState('/', {
            context: this,
            state: 'messages'
        })
    }


    render() {
        const messages = Object.keys(this.state.messages).map((key, index) => (
            <Message key={index}
                pseudo={this.state.messages[key].pseudo}
                message={this.state.messages[key].message}
            />
        ));

        return (
            <div className={'box'}>
                <div>
                    <div className="messages" ref={this.messageRef}>
                        <div className="message">
                            {messages}
                        </div>
                    </div>
                    <Formulaire
                        length={140}
                        addMessage={this.addMessage}
                        pseudo={this.state.pseudo}
                    />
                </div>
            </div>
        );
    }
}

export default App;
