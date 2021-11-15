import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout, selectToken, selectUser } from '../state/auth';

export default function useAuthentication() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
  
    const { push } = useHistory();
  
    const authenticated = token;
  
    const _logout = async (e: any) => {
      e.preventDefault();
      dispatch(logout());
      push('/')
    };
  
    const login = async () => {
      return;
    };
  
    return { authenticated, login, logout:_logout };
  }