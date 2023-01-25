import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosJWT } from '../configs/axios';

const FormAddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post(`${process.env.REACT_APP_API}/users`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });

      navigate('/users');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Add New User</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={saveUser}>
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label htmlFor='name' className='label'>
                  Name
                </label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Name'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='email' className='label'>
                  Email
                </label>
                <div className='control'>
                  <input
                    type='email'
                    className='input'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='password' className='label'>
                  Password
                </label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    placeholder='******'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='confirm-password' className='label'>
                  Confirm Password
                </label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    placeholder='******'
                    id='confirm-password'
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='Role' className='label'>
                  Role
                </label>
                <div className='control'>
                  <div className='select is-fullwidth'>
                    <select
                      id='role'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value='' disabled>
                        Pilih Role
                      </option>
                      <option value='admin'>Admin</option>
                      <option value='user'>User</option>
                    </select>
                  </div>
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

export default FormAddUser;
