import React from 'react';
import './App.css';
import './animation.css'

// Components
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";

// Firebase
import base from './base';

// Animation
import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group";

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            pseudo: this.props.match.params.pseudo,
        }
        // Create messages ref on the div
        this.messageRef = React.createRef()
    }




    addMessage = (message) => {
        const messages = { ... this.state.messages }
        messages[`message-${Date.now()}`] = message;

        Object.keys(messages).slice(0, -10).forEach(key => {
            messages[key] = null
        })

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

    isUser = (pseudo) => {
        return pseudo === this.state.pseudo
    }


    render() {
        const messages = Object.keys(this.state.messages).map((key, index) => (
            <CSSTransition
                key={index}
                timeout={200}
                classNames={'fade'}
            >
                <Message
                    isUser={this.isUser}
                    pseudo={this.state.messages[key].pseudo}
                    message={this.state.messages[key].message}
                />
            </CSSTransition>
        ));

        return (
            <div className={'box'}>
                <div>
                    <div className="messages" ref={this.messageRef}>
                        <TransitionGroup className="message">
                            {messages}
                        </TransitionGroup>
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
