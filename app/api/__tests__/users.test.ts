import { User } from '@/types';
import axiosInstance from '../Client'; 
import { getAllUsers, banOrUnban } from '../usersApi'; 

jest.mock('../Client', () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

describe('API Functions test for the users actions ', () => {
  
  it('fetches users successfully', async () => {
  
    const mockData:User[] = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        birthDay: new Date('1990-01-01'),
        isBaned: false,
        image: 'http://example.com/john.jpg',
      },
    ];

   
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getAllUsers(); 

    expect(result).toEqual(mockData);
    expect(axiosInstance.get).toHaveBeenCalledWith('auth-service/auth/all_users'); 
  });

  it('handles banning or unbanning a user', async () => {
    const mockResponse = {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      birthDay: new Date('1990-01-01'),
      isBaned: false,
      image: 'http://example.com/john.jpg',
    };

    (axiosInstance.patch as jest.Mock).mockResolvedValue({ data: mockResponse });

    const userId = '1';
    const result = await banOrUnban(userId); 

    expect(result).toEqual(mockResponse); 
    expect(axiosInstance.patch).toHaveBeenCalledWith(`auth-service/auth/userActivity/${userId}`); 
  });

  it('handles errors in getAllUsers', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(new Error('Request failed with status code 500'));

    await expect(getAllUsers()).rejects.toThrow('Request failed with status code 500');
    expect(axiosInstance.get).toHaveBeenCalledWith('auth-service/auth/all_users');
  });

  it('handles errors in banOrUnban', async () => {
    (axiosInstance.patch as jest.Mock).mockRejectedValue(new Error('Request failed with status code 500'));

    const userId = '1';
    await expect(banOrUnban(userId)).rejects.toThrow('Request failed with status code 500'); 
    expect(axiosInstance.patch).toHaveBeenCalledWith(`auth-service/auth/userActivity/${userId}`);
  });
});
