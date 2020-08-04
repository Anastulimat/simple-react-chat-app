import React from "react";
import { Redirect } from "react-router-dom";

class Connexion extends React.Component
{
    state = {
        pseudo: '',
        goToChat: false
    }

    handleChange = (event) => {
        const pseudo = event.target.value;
        this.setState({
            pseudo: pseudo
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            goToChat: true
        })
    }

    render() {

        if(this.state.goToChat)
        {
            return <Redirect push to={`/pseudo/${this.state.pseudo}`}/>
        }

        return (
            <div className={'connexionBox'}>
                <form
                    className={'connexion'}
                    onSubmit={this.handleSubmit}
                >
                    <input
                        value={this.state.pseudo}
                        onChange={this.handleChange}
                        type="text"
                        placeholder={'Pseudo'}
                        required={true}
                    />
                    <button type={"submit"}>GO</button>
                </form>
            </div>
        );
    }
}

export default Connexion;