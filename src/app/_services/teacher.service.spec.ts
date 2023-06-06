import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TeacherService } from './teacher.service';



describe('teacherService', () => {
  let teacherService: TeacherService;
  let http: HttpClient;

  
  beforeEach(() => {

    http = {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),

    } as unknown as HttpClient;

    teacherService = new TeacherService(http);
  });

  it('should be created', () => {
    expect(teacherService).toBeTruthy();
  });


  describe('Add a teacher', () => {
    it('should make a POST a request to add a new teacher', async () => {
      const teacherMockData = {
        teacherId: "SMT003",
        userName:"ralph123",
        password:"rup@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        department: "SCIENCE"
      };

      // (http.post as jest.Mock).mockReturnValueOnce(of({}));
      (http.post as jest.Mock).mockReturnValueOnce(Promise.resolve({teacherId: "SMT003"}));

      // await teacherService.addTeacher(teacherMockData).toPromise();

      const addTeacherPromise = teacherService.addTeacher(teacherMockData);
      expect(http.post).toHaveBeenCalledWith(`${teacherService.baseURL}/addTeacher`, teacherMockData);
      expect(addTeacherPromise).resolves.toEqual({teacherId: "SMT003"});

    });
  });


  describe('update a teacher', () => {
    it('should make a PUT a request to update teacher details', async () => {
      const teaId = "SMT003";
      const updateMockData = {
        teacherId: teaId,
        userName:"ralph123",
        password:"rup@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        department: "SCIENCE"
      };

      (http.put as jest.Mock).mockReturnValueOnce(Promise.resolve({teacherId: teaId}));

      const updateTeacherPromise = teacherService.updateTeacher(teaId, updateMockData);
      await expect(updateTeacherPromise).resolves.toEqual({teacherId: teaId});
      expect(http.put).toHaveBeenCalledWith(`${teacherService.baseURL}/${teaId}`, updateMockData);
    });
  });

  describe('get a teacher by id', () => {
    it('should make a GET request to retrieve teachers details by teacherId', async () => {
      const teaId = "SMT005";
      const getTeacherData = {
        teacherId: teaId,
        userName:"ana123",
        password:"ana@pass",
        name:"Ana Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "kolkata",
        phoneNo: "6345617893",
        email:"ana@g.co",
        department: "ARTS"
      };

      (http.get as jest.Mock).mockReturnValueOnce(Promise.resolve(getTeacherData));

      const getTeacherPromise = teacherService.getTeacherByTeacherId(teaId);
      expect(http.get).toHaveBeenCalledWith(`${teacherService.baseURL}/${teaId}`);
      expect(getTeacherPromise).resolves.toEqual(getTeacherData);
    });
  });




  describe('listAll teachers', () => {
    it('should make a GET request to retrieve all teachers list', async () => {
      const teachersMockData = [{
        teacherId: "SMT003",
        userName:"ralph123",
        password:"rup@pass",
        name:"Ralph Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "Howrah",
        phoneNo: "6345617893",
        email:"ralph@g.co",
        department: "SCIENCE"
      },
      {
        teacherId: "SMT005",
        userName:"ana123",
        password:"ana@pass",
        name:"Ana Del",
        age: 14,
        birthDate: "2010-12-08",
        gender: "Male",
        address: "kolkata",
        phoneNo: "6345617893",
        email:"ana@g.co",
        department: "ARTS"
      }];

      (http.get as jest.Mock).mockReturnValueOnce(of(teachersMockData));

      const listTeachersPromise = teacherService.listAllTeachers().toPromise();
      expect(http.get).toHaveBeenCalledWith(`${teacherService.baseURL}/listTeachers`);
      expect(listTeachersPromise).resolves.toEqual(teachersMockData);
    });
  });

  describe('delete a teacher', () => {
    it('should make a DELETE request to delete a teacher by teacherId', async () => {
      const teaId = "SMT006";

      (http.delete as jest.Mock).mockReturnValueOnce({});

      await teacherService.deleteTeacher(teaId);
      expect(http.delete).toHaveBeenCalledWith(`${teacherService.baseURL}/${teaId}`, {"responseType": "text"});

    });
  });

  describe('count teacher', () => {
    it('should make a GET request to retrieve the count of teacher', async () => {
      const count = 10;

      (http.get as jest.Mock).mockReturnValueOnce(of(count));

      const teacherCount = await teacherService.countTeacher().toPromise();

      expect(http.get).toHaveBeenCalledWith(`${teacherService.baseURL}/countTeacher`, {"responseType": "text"});
      expect(teacherCount).toEqual(count);

    });
  });


  
});
