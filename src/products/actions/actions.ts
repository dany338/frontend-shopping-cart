import axios from 'axios';

export const listarProductos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    console.error('Error obteniendo todos los productos:', error);
    throw new Error('Error obteniendo todos los productos. Por favor intente de nuevo.');
  }
};