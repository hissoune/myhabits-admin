import axiosInstance from '../Client'; 
import { Frequency, Habit, Status } from '../../../types';
import { deleteHabit, getAllHabits, reActiveHabit } from '../habitsApi';

jest.mock('../Client', () => ({
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  }));

  describe('Api functions tests for the habits fonctionality ',()=>{

     it('getAllHabits must return a arrau of the habits ',async () => {
        const mockedData: Habit[] = [{
            _id: "67bbd050a2192bcd76eaac2e",
            userId: {
              _id: "67c209be73d06d0d5d4bab55",
              name: "Khal",
              email: "kh@gmail.com",
              password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
              birthDay: new Date("2025-01-05T18:06:00.000Z"),
              image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
              role: "admin",
              isBaned: false,
            },
            title: "sfdfhyjguy",
            description: "dfghjykuyliukyjthgdfsq",
            frequency:Frequency.Daily,
            sucsess: 0,
            fails: 3,
            progress: 0,
            repeats: 3,
            status: Status.Failed,
            createdAt: new Date("2025-01-01T00:00:00.000Z"),
            updatedAt: new Date("2025-01-02T00:00:00.000Z"),
          }];

          (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockedData });

          const result = await getAllHabits();

          expect(result).toEqual(mockedData);
          expect(axiosInstance.get).toHaveBeenCalledWith('habits-service/habits/all_for_admin');
     });

     it('handles errors in getAllHabits', async () => {
        (axiosInstance.get as jest.Mock).mockRejectedValue(new Error('Request failed with status code 500'));
    
        await expect(getAllHabits()).rejects.toThrow('Request failed with status code 500');
        expect(axiosInstance.get).toHaveBeenCalledWith('habits-service/habits/all_for_admin');
      });

     it('delete habits must return a status value with 200 and the deleted habit to manage the state ', async () => {
        const mockedData: Habit = {
            _id: "67bbd050a2192bcd76eaac2e",
            userId: {
              _id: "67c209be73d06d0d5d4bab55",
              name: "Khal",
              email: "kh@gmail.com",
              password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
              birthDay: new Date("2025-01-05T18:06:00.000Z"),
              image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
              role: "admin",
              isBaned: false,
            },
            title: "sfdfhyjguy",
            description: "dfghjykuyliukyjthgdfsq",
            frequency:Frequency.Daily,
            sucsess: 0,
            fails: 3,
            progress: 0,
            repeats: 3,
            status: Status.Failed,
            createdAt: new Date("2025-01-01T00:00:00.000Z"),
            updatedAt: new Date("2025-01-02T00:00:00.000Z"),
          };

          (axiosInstance.delete as jest.Mock).mockResolvedValue({ data: mockedData });
          const result = await deleteHabit(mockedData._id || "");

          expect(result).toEqual(mockedData);
          expect(axiosInstance.delete).toHaveBeenCalledWith(`habits-service/habits/${mockedData._id}`);


     });

     it('delete habits handling the erors must return a error of the unability of deleting the habuit ',async () => {
        (axiosInstance.delete as jest.Mock).mockRejectedValue(new Error('Request failed with status code 500'));
        const habitId = '67bbd050a2192bcd76eaac2e';
        await expect(deleteHabit(habitId)).rejects.toThrow('Request failed with status code 500');
        expect(axiosInstance.delete).toHaveBeenCalledWith(`habits-service/habits/${habitId}`);
     });


     it('reActiveHabit must reactivate a habit successfully', async () => {
        const mockedResponse:Habit = {
            _id: "67bbd050a2192bcd76eaac2e",
            userId: {
              _id: "67c209be73d06d0d5d4bab55",
              name: "Khal",
              email: "kh@gmail.com",
              password: "$2b$10$F4mvcC9.9Kg1QVG8GpnenOn6SIasaQp5irRxJAJSSjzP0vn12HE52",
              birthDay: new Date("2025-01-05T18:06:00.000Z"),
              image: "http://127.0.0.1:9000/upload/image_1740769717457_image.jpg",
              role: "admin",
              isBaned: false,
            },
            title: "sfdfhyjguy",
            description: "dfghjykuyliukyjthgdfsq",
            frequency:Frequency.Daily,
            sucsess: 0,
            fails: 3,
            progress: 0,
            repeats: 3,
            status: Status.Failed,
            createdAt: new Date("2025-01-01T00:00:00.000Z"),
            updatedAt: new Date("2025-01-02T00:00:00.000Z"),
          };
    
          (axiosInstance.patch as jest.Mock).mockResolvedValue({ data: mockedResponse });
    
        const habitId = '67bbd050a2192bcd76eaac2e';
        const result = await reActiveHabit(habitId); 
    
        expect(result).toEqual(mockedResponse); 
        expect(axiosInstance.patch).toHaveBeenCalledWith(`habits-service/habits/${habitId}`); 
      });
     
      it('handles errors in reActiveHabit', async () => {
        (axiosInstance.patch as jest.Mock).mockRejectedValue(new Error('Request failed with status code 500'));
    
        const habitId = '67bbd050a2192bcd76eaac2e';
        await expect(reActiveHabit(habitId)).rejects.toThrow('Request failed with status code 500'); 
        expect(axiosInstance.patch).toHaveBeenCalledWith(`habits-service/habits/${habitId}`);
      });
     

  })