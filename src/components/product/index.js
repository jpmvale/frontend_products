import React, { Component } from "react";
import "./index.css";
import api from "../../services/api";

export default class Product extends Component {

    state = {
        product: {

        }
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`products/listProduct/${id}`);
        console.log(response);
        this.setState({
            product: response.data,
        });
    }

    render() {
        const { product } = this.state;
        return (
            <div className="product-info">
                <h1>{product.description}</h1>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
            </div>
        )
    }
}