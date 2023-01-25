import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosJWT } from '../configs/axios';

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) getProducts();
  }, [token]);

  const getProducts = async () => {
    const response = await axiosJWT.get(
      `${process.env.REACT_APP_API}/products`
    );
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axiosJWT.delete(`${process.env.REACT_APP_API}/products/${productId}`);
    getProducts();
  };

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className='subtitle'>List of Products</h2>
      <Link to='/products/add' className='button is-primary mb-2'>
        Add New
      </Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className='button is-small is-info'
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className='button is-small is-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productlist;
