import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StudentService } from './student.service';


describe('StudentService', () => {

  let studentService: StudentService;
  let http: HttpClient;

  beforeEach(() => {

    http = {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),

    } as unknown as HttpClient;

    studentService = new StudentService(http);
  });

  it('should be created', () => {
    expect(studentService).toBeTruthy();
  });


  describe('Add a Student', () => {
    it('should make a POST a request to add a new Student', async () => {
      const studentMockData = {
        studentId: "SMS003",
        userName:"ralph123",
        password:"rup@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        classe: "seven",
        section: "A",
      };

      // (http.post as jest.Mock).mockReturnValueOnce(of({}));
      (http.post as jest.Mock).mockReturnValueOnce(Promise.resolve({studentId: "SMS003"}));

      const addStudentPromise = studentService.addStudent(studentMockData);
      expect(http.post).toHaveBeenCalledWith(`${studentService.baseURL}/addStudent`, studentMockData);
      expect(addStudentPromise).resolves.toEqual({studentId: "SMS003"});

    });
  });


  describe('update a Student', () => {
    it('should make a PUT a request to update Student details', async () => {
      const stuId = "SMS003";
      const updateMockData = {
        studentId: stuId,
        userName:"ralph123",
        password:"rup@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        classe: "seven",
        section: "A",
      };

      (http.put as jest.Mock).mockReturnValueOnce(Promise.resolve({studentId: stuId}));

      const updateStudentPromise = studentService.updateStudent(stuId, updateMockData);
      await expect(updateStudentPromise).resolves.toEqual({studentId: stuId});
      expect(http.put).toHaveBeenCalledWith(`${studentService.baseURL}/${stuId}`, updateMockData);

    });
  });


  describe('get a student by id', () => {
    it('should make a GET request to retrieve students details by studentID', async () => {

      const stuId = "SMS002";
      const getStudentData = {
        studentId: stuId,
        userName:"ralph123",
        password:"ralph@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        classe: "seven",
        section: "A",
      };

      (http.get as jest.Mock).mockReturnValueOnce(Promise.resolve(getStudentData));

      const getStudentPromise = studentService.getStudentByStudentId(stuId);
      expect(http.get).toHaveBeenCalledWith(`${studentService.baseURL}/${stuId}`);
      expect(getStudentPromise).resolves.toEqual(getStudentData);

    });
  });


  describe('listAll students', () => {
    it('should make a GET request to retrieve students list', async () => {
      const studentsMockData = [{
        studentId: "SMS002",
        userName:"ralph123",
        password:"rup@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        classe: "seven",
        section: "A",
      },
      {
        studentId: "SMS002",
        userName:"ani123",
        password:"ana@pass",
        name:"Ana Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Kolkata",
        phoneNo: "6345617893",
        email:"ana@g.co",
        classe: "seven",
        section: "B",
      }];

      (http.get as jest.Mock).mockReturnValueOnce(of(studentsMockData));

      const listStudentsPromise = studentService.listAllStudents().toPromise();
      expect(http.get).toHaveBeenCalledWith(`${studentService.baseURL}/listStudents`);
      expect(listStudentsPromise).resolves.toEqual(studentsMockData);
    });
  });


  describe('delete a student', () => {
    it('should make a DELETE request to delete a student by studentID', async () => {
      const stuId = "SMS002";

      (http.delete as jest.Mock).mockReturnValueOnce({});

      await studentService.deleteStudent(stuId);
      expect(http.delete).toHaveBeenCalledWith(`${studentService.baseURL}/${stuId}`, {"responseType": "text"});

    });
  });

  describe('count teacher', () => {
    it('should make a GET request to retrieve the count of teacher', async () => {
      const count = 10;

      (http.get as jest.Mock).mockReturnValueOnce(of(count));

      const studentCount = await studentService.countStudent().toPromise();

      expect(http.get).toHaveBeenCalledWith(`${studentService.baseURL}/countStudent`, {"responseType": "text"});
      expect(studentCount).toEqual(count);

    });
  });

  
});
