import { login } from '../authApi';
import axiosInstance from '../Client'; 
import {jest} from '@jest/globals';

interface User {
  _id: string;
  name: string;
  email: string;
  birthDay: Date;
  isBaned: boolean;
  image: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

jest.mock('../Client', () => ({
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  }));

  describe('auth tests ', () => {
    
    it('loginfunction must return a token and a user ',async () => {
        const mockResponse: LoginResponse = {token:"cdcccccccccccjkkkkkkkkdbc",user:{
            _id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            birthDay: new Date('1990-01-01'),
            isBaned: false,
            image: 'http://example.com/john.jpg',
          }};
          (axiosInstance.post as jest.Mock).mockResolvedValue({ data: mockResponse });
           const result = await login({ email: mockResponse.user.email, password: 'password' });
           expect(result).toEqual(mockResponse);
           expect(axiosInstance.post).toHaveBeenCalledWith('auth-service/auth/login',{ email: mockResponse.user.email, password: 'password' });
    });
    
  });
  