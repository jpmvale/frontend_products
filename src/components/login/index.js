import React, { Component } from 'react';
import './index.css';
import api from '../../services/api';
import { FaUserCircle } from "react-icons/fa";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleSubmit = async event => {
        event.preventDefault();
        const response = await api.post('/user/authenticateUser', {
            email: this.state.email,
            password: this.state.password,
        });

        if (response.data) {
            localStorage.setItem("@productSystem", response.data.employeePosition);
            this.props.history.push('/main');
        }

    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (

            <div className='login-container'>
                <form onSubmit={this.handleSubmit}>
                    <FaUserCircle color="#" />
                    <input type='text'
                        placeholder='email@dominio.com.br'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleOnChange} />

                    <input type='password'
                        placeholder='senha'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleOnChange} />

                    <button type='submit'>Entrar</button>
                </form>
            </div>
        )
    }
}