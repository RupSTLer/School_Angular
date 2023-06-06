import { TestBed } from '@angular/core/testing';

import { FeeService } from './fee.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('FeeService', () => {
  let feeService: FeeService;
  let http: HttpClient;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // feeService = TestBed.inject(FeeService);

    http = {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),

    } as unknown as HttpClient;

    feeService = new FeeService(http);
  });

  it('should be created', () => {
    expect(feeService).toBeTruthy();
  });

  describe('Payfees', () => {
    it('should make a POST a request to pay a new Fee', async () => {
      const payMockData = {
        id: 13,
        studentId: "SMS003",
        studentName:"Rupam Roy",
        amount: 3333,
        feeType:"Monthly",
        paymentType:"Cash",
        time: "30-05-2023 20:29",
      };

      (http.post as jest.Mock).mockReturnValueOnce(of('fees paid'));

      // await feeService.payFees(payMockData).toPromise();

      const payFeePromise = feeService.payFees(payMockData).toPromise();
      expect(http.post).toHaveBeenCalledWith(`${feeService.baseURL}/payFees`, payMockData, {responseType: 'text'});
      expect(payFeePromise).resolves.toEqual(('fees paid'));

    });
  });


  describe('update fee details', () => {
    it('should make a PUT a request to update fee details', async () => {
      const updateMockData = {
        id: 4,
        studentId: "SMS003",
        studentName:"Rupam Roy",
        amount: 3333,
        feeType:"Monthly",
        paymentType:"Cash",
        time: "30-05-2023 20:29",
      };

      (http.put as jest.Mock).mockReturnValueOnce(Promise.resolve({}));

      const updateFeePromise = feeService.updateFees(updateMockData);
      expect(http.put).toHaveBeenCalledWith(`${feeService.baseURL}/updateFee`, updateMockData);
      await expect(updateFeePromise).resolves.toEqual({});

    });
  });


  describe('listAll fees', () => {
    it('should make a GET request to retrieve fee list', async () => {
      const feeListMockData = [{
        id: 3,
        studentId: "SMS003",
        studentName:"Rupam Roy",
        amount: 3333,
        feeType:"Monthly",
        paymentType:"Cash",
        time: "30-05-2023 20:29",
      },
      {
        id: 4,
        studentId: "SMS004",
        studentName:"Ritam Roy",
        amount: 6666,
        feeType:"Quaterly",
        paymentType:"Card",
        time: "31-05-2023 20:29",
      }];

      (http.get as jest.Mock).mockReturnValueOnce(of(feeListMockData));

      const listFeesPromise = feeService.listFees().toPromise();
      expect(http.get).toHaveBeenCalledWith(`${feeService.baseURL}/listFees`);
      expect(listFeesPromise).resolves.toEqual(feeListMockData);
    });
  });


  describe('get a fee details by studentId', () => {
    it('should make a GET request to retrieve fee details by studentId', async () => {

      const stuId = "SMS004";
      const getFeesData = {
        id: 4,
        studentId: stuId,
        studentName:"Ritam Roy",
        amount: 6666,
        feeType:"Quaterly",
        paymentType:"Card",
        time: "31-05-2023 20:29",
      };

      (http.get as jest.Mock).mockReturnValueOnce(Promise.resolve(getFeesData));

      const getFeePromise = feeService.getFeesByStudentId(stuId);
      expect(http.get).toHaveBeenCalledWith(`${feeService.baseURL}/getFeesByStudentId/${stuId}`);
      expect(getFeePromise).resolves.toEqual(getFeesData);

    });
  });


});
