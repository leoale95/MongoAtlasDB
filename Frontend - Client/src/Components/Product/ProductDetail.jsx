import React, { Component } from 'react';
import axios from 'axios';

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
      console.log('ID del producto:', productId); // Agrega este console.log para verificar si el ID se está pasando correctamente
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        console.log('Respuesta de la solicitud:', response.data); // Agrega este console.log para verificar la respuesta del servidor
        if (response.data) {
          this.setState({ product: response.data });
        } else {
          console.error('No se encontraron detalles del producto.');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error); // Agrega este console.log para mostrar errores en la consola
      }
    }
  }

  render() {
    const { product } = this.state;

    // if (!product) {
    //   return <div>Loading...</div>;
    // }

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            {/* <img
              // src={product.image}
              alt={product.title}
              className="img-fluid"
            /> */}
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <Link to="/">Back to Product List</Link>
          </div>
        </div>
      </div>
    );
  }
}
