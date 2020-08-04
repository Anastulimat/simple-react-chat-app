import React from 'react';
import './App.css';
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            pseudo: this.props.match.params.pseudo,
        }
    }

    addMessage = (message) => {
        const messages = { ... this.state.messages }
        messages[`message-${Date.now()}`] = message;
        this.setState({
            messages: messages
        })
    }


    render() {
        const messages = Object.keys(this.state.messages).map((key, index) => (
            <Message key={index}
                pseudo={this.state.messages[key].pseudo}
                message={this.state.messages[key].message}
            />
        ));

        console.log(messages);

        return (
            <div className={'box'}>
                <div>
                    <div className="messages">
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
