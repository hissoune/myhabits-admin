
import { chalenge } from '@/types';
import axiosInstance from '../Client'; 
import { createChallenge, getAllChalenges } from '../chalengeApi';

jest.mock('../Client', () => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  }));

  describe('challenges Api tests ', () => {

    
    it('getAllChalenges must return a array of chealenges ',async () => {
        const mockedchalenge: chalenge[] = [{
            _id: "67c1109eab1d32fe06b43624",
            title: "jkbhyvutcyrxte(wz'wer-dtèfgy_uçhijhugyfut",
            description: "kjtuygihop^pjihugyj",
            creator: {
                _id: "67c209be73d06d0d5d4bab55",
                name: "Khal",
                email: "kh@gmail.com",
                password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
                birthDay: new Date("2025-01-05T18:06:00.000Z"),
                image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
                role: "admin",
                
                isBaned: false
            },
            startDate: "2025-02-20T00:00:00.000Z",
            endDate: "2025-05-24T00:00:00.000Z",
            participants: [
                {
                    userId: "67c9965a4217c9c8ffa787f9",
                    progress: 100,
                    userDetails: {
                        _id: "67c9965a4217c9c8ffa787f9",
                        name: "khh",
                        email: "khg@gmail.com",
                        password: "$2b$10$vFk98amA3eLZkFdIMoDim.ETQ7mEdURoC7SxaiQ/L69qGuE6dDf12",
                        birthDay: new Date("2025-03-11T12:34:00.000Z"),
                        image: "http://127.0.0.1:9000/upload/image_1741264436044_image.jpg",
                        role: "client",
                       
                        isBaned: false
                    }
                },
                {
                    userId: "67c209be73d06d0d5d4bab55",
                    progress: 33,
                    userDetails: {
                        _id: "67c209be73d06d0d5d4bab55",
                        name: "Khal",
                        email: "kh@gmail.com",
                        password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
                        birthDay: new Date("2025-01-05T18:06:00.000Z"),
                        image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
                        role: "admin",
                        isBaned: false
                    }
                },
                
            ],
            frequency: "daily",
            repeats: 3,
            image: "https://i.pinimg.com/236x/59/92/12/59921222523f839ef82.jpg"
    }];

    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockedchalenge });
          const result = await getAllChalenges();

          expect(result).toEqual(mockedchalenge);
          expect(axiosInstance.get).toHaveBeenCalledWith('chalenges-service/chalenges');
});

it('getAllChalenges should handle errors correctly', async () => {

    (axiosInstance.get as jest.Mock).mockRejectedValue("Failed to fetch challenges");

    await expect(getAllChalenges()).rejects.toThrow("Failed to fetch challenges");

    expect(axiosInstance.get).toHaveBeenCalledWith('chalenges-service/chalenges');
});

it('should create a challenge successfully', async () => {
   

const mockResponse:chalenge = {
    _id: "67c1109eab1d32fe06b43624",
    title: "jkbhyvutcyrxte(wz'wer-dtèfgy_uçhijhugyfut",
    description: "kjtuygihop^pjihugyj",
    creator: {
        _id: "67c209be73d06d0d5d4bab55",
        name: "Khal",
        email: "kh@gmail.com",
        password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
        birthDay: new Date("2025-01-05T18:06:00.000Z"),
        image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
        role: "admin",
        
        isBaned: false
    },
    startDate: "2025-02-20T00:00:00.000Z",
    endDate: "2025-05-24T00:00:00.000Z",
    participants: [
        {
            userId: "67c9965a4217c9c8ffa787f9",
            progress: 100,
            userDetails: {
                _id: "67c9965a4217c9c8ffa787f9",
                name: "khh",
                email: "khg@gmail.com",
                password: "$2b$10$vFk98amA3eLZkFdIMoDim.ETQ7mEdURoC7SxaiQ/L69qGuE6dDf12",
                birthDay: new Date("2025-03-11T12:34:00.000Z"),
                image: "http://127.0.0.1:9000/upload/image_1741264436044_image.jpg",
                role: "client",
               
                isBaned: false
            }
        },
        {
            userId: "67c209be73d06d0d5d4bab55",
            progress: 33,
            userDetails: {
                _id: "67c209be73d06d0d5d4bab55",
                name: "Khal",
                email: "kh@gmail.com",
                password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
                birthDay: new Date("2025-01-05T18:06:00.000Z"),
                image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
                role: "admin",
                isBaned: false
            }
        },
        
    ],
    frequency: "daily",
    repeats: 3,
    image: "https://i.pinimg.com/236x/59/92/12/59921222523f839ef82.jpg"
};
(axiosInstance.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await createChallenge(mockResponse);

    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith('chalenges-service/chalenges', mockResponse);
  });

  it('should handle errors correctly', async () => {

    const mockChallenge = {
        _id: "67c1109eab1d32fe06b43624",
        title: "jkbhyvutcyrxte(wz'wer-dtèfgy_uçhijhugyfut",
        description: "kjtuygihop^pjihugyj",
        creator: {
            _id: "67c209be73d06d0d5d4bab55",
            name: "Khal",
            email: "kh@gmail.com",
            password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
            birthDay: new Date("2025-01-05T18:06:00.000Z"),
            image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
            role: "admin",
            isBaned: false
        },
        startDate: "2025-02-20T00:00:00.000Z",
        endDate: "2025-05-24T00:00:00.000Z",
        participants: [
            {
                userId: "67c9965a4217c9c8ffa787f9",
                progress: 100,
                userDetails: {
                    _id: "67c9965a4217c9c8ffa787f9",
                    name: "khh",
                    email: "khg@gmail.com",
                    password: "$2b$10$vFk98amA3eLZkFdIMoDim.ETQ7mEdURoC7SxaiQ/L69qGuE6dDf12",
                    birthDay: new Date("2025-03-11T12:34:00.000Z"),
                    image: "http://127.0.0.1:9000/upload/image_1741264436044_image.jpg",
                    role: "client",
                    isBaned: false
                }
            },
            {
                userId: "67c209be73d06d0d5d4bab55",
                progress: 33,
                userDetails: {
                    _id: "67c209be73d06d0d5d4bab55",
                    name: "Khal",
                    email: "kh@gmail.com",
                    password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
                    birthDay: new Date("2025-01-05T18:06:00.000Z"),
                    image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
                    role: "admin",
                    isBaned: false
                }
            },
        ],
        frequency: "daily",
        repeats: 3,
        image: "https://i.pinimg.com/236x/59/92/12/59921222523f839ef82.jpg"
    };

    (axiosInstance.post as jest.Mock).mockRejectedValue("Failed to create challenge");

    await expect(createChallenge(mockChallenge)).rejects.toThrow("Failed to create challenge");

    expect(axiosInstance.post).toHaveBeenCalledWith('chalenges-service/chalenges', mockChallenge);
  });

    
  });
  