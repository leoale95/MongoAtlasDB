import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      prevLink: null,
      nextLink: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      const { prevLink, nextLink, payload: products } = response.data;
      this.setState({ products, prevLink, nextLink });
    } catch (error) {
      console.error(error);
    }
  }

  async applyFilter(filter) {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?category=${filter}`);
      const { prevLink, nextLink, payload: products } = response.data;
      this.setState({ products, prevLink, nextLink });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          {/* Botones de filtrado */}
          <Button variant="primary" onClick={() => this.applyFilter("men's clothing")}>
          Men's clothing
          </Button>
          <Button variant="primary" onClick={() => this.applyFilter("jewelery")}>
          jewelery
          </Button>
          <Button variant="primary" onClick={() => this.applyFilter("electronics")}>
          Electronics
          </Button>
          {/* ... Agrega más botones de filtro según tus categorías ... */}
        </div>

        {/* Lista de productos */}
        <div className="row mt-4">
          {this.state.products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-12 mb-4">
              <Card className="d-flex h-100">
                <Card.Img style={{ height: '400px' }} variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                </Card.Body>
                <Link to={`/products/${product._id}`}>
                  <Button variant="secondary">More details</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>

        {/* Botones de paginación */}
        <div className="row mt-4">
          {this.state.prevLink && (
            <Link to={this.state.prevLink} className="mr-2">
              <Button variant="primary">Previous Page</Button>
            </Link>
          )}
          {this.state.nextLink && (
            <Link to={this.state.nextLink}>
              <Button variant="primary">Next Page</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
