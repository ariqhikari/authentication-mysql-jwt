import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosJWT } from '../configs/axios';

const FormAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post(`${process.env.REACT_APP_API}/products`, {
        name: name,
        price: price,
      });

      navigate('/products');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className='subtitle'>Add New Product</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={saveProduct}>
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label htmlFor='product-name' className='label'>
                  Product Name
                </label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Product Name'
                    id='product-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='price' className='label'>
                  Price
                </label>
                <div className='control'>
                  <input
                    type='number'
                    className='input'
                    placeholder='Price'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
