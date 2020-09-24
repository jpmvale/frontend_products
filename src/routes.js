import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './components/main';
import Product from './components/product';
import Login from './components/login';
import ProductRecord from './components/productRecord';

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/productRecord' component={ProductRecord} />
                    <Route path='/main' component={Main} />
                    <Route path='/product/:id' component={Product} />
                </Switch>
            </BrowserRouter>
        )
    }
}