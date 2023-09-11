import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    if (match && match.params && match.params.id) {
      const productId = match.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        this.setState({ product: response.data });
      } catch (error) {
        console.error(error);
      }
    }
  }
  

  render() {
    const { product } = this.state;

    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <Link to="/">Back to Product List</Link>
          </div>
        </div>
      </div>
    );
  }
}
