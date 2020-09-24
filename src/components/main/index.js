import React, { Component } from "react";
import "./index.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default class Main extends Component {
    state = {
        docs: [],
        info: [],
        page: 1,
        search: ""
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const result = await api.get(`products/getProducts?&page=${page}`);
        const { docs, ...info } = result.data;
        this.setState({ docs, info, page });
    }

    nextPage = () => {
        const { page, info } = this.state;
        if (page == info.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    prevPage = () => {
        const { page } = this.state;
        if (page == 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    handleOnChage = event => {
        this.setState({ search: event.target.value });
    }

    handleOnSubmit = event => {
        event.preventDefault();
        if (this.state.search) {
            this.searchProducts();
        }
        else {
            this.loadProducts();
        }
    }

    searchProducts = async () => {
        const result = await api.get(`products/listProductByName/${this.state.search}`);
        this.setState({ docs: result.data })
    }

    render() {
        const { info, page } = this.state;
        return (

            <div className="productList">
                <div className="search">
                    <form onSubmit={this.handleOnSubmit}>
                        <input type="text" name="search" placeholder="Search by name" value={this.state.search} onChange={this.handleOnChage} />
                        <input type="submit" hidden />
                    </form>
                </div>

                {
                    this.state.docs.map(product => (
                        <article key={product._id}>
                            <strong>{product.description}</strong>
                            <p>{product.supplier}</p>
                            <Link to={`/product/${product._id}`}>Detalhes</Link>
                        </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === info.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}