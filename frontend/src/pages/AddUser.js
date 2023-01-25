import { useEffect } from 'react';
import Layout from './Layout';
import FormAddUser from '../components/FormAddUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../features/authSlice';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default AddUser;
