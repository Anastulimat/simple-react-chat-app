import React from "react";

class Formulaire extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            length: this.props.length
        }
    }

    createMessage = () => {
        const {addMessage, pseudo} = this.props;
        const message = {
            pseudo: pseudo,
            message: this.state.message
        }
        addMessage(message);

        //Reset
        this.setState({
            message: ''
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.createMessage();
    }

    handleChange = (event) => {
        const message = event.target.value;
        const length = this.props.length - message.length;
        this.setState({
            message: message,
            length: length
        })
    }

    handleOnKeyUp = (event) => {
        if(event.key === 'Enter')
        {
            this.createMessage();
        }
    }

    render() {
        return (
            <form className={'form'} onSubmit={this.handleSubmit}>
                <textarea
                    required={true}
                    maxLength={this.state.length}
                    onChange={this.handleChange}
                    onKeyUp={this.handleOnKeyUp}
                    value={this.state.message}
                />
                <div className="info">{this.state.length}</div>
                <button type={"submit"}>Envoyer</button>
            </form>
        );
    }
}

export default Formulaire;