import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosJWT } from '../configs/axios';

const FormEditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axiosJWT.get(
          `${process.env.REACT_APP_API}/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    if (token) getProductById();
  }, [id, token]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.patch(`${process.env.REACT_APP_API}/products/${id}`, {
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
      <h2 className='subtitle'>Edit Product</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={updateProduct}>
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
                    Update
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

export default FormEditProduct;
