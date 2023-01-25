import { useEffect } from 'react';
import Layout from './Layout';
import Userlist from '../components/Userlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../features/authSlice';

const Dashboard = () => {
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
      <Userlist />
    </Layout>
  );
};

export default Dashboard;
