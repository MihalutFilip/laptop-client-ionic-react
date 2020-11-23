import React from 'react';
import axios from 'axios';
import { baseUrl, config } from '../utils/Cofingurations';
import { Laptop } from '../models/Laptop';

const itemUrl = `${baseUrl}/laptop`;

export class LaptopApi {
  private LaptopApi() {}
  
  protected getUserLaptopsApi: (page: number, userId: number) => Promise<any> = (page, userId) => {
    return axios.get(`${itemUrl}?page=${page}&userId=${userId}`);
  }
  
  protected getLaptopsApi: (page: number) => Promise<any> = (page) => {
    return axios.get(`${itemUrl}?page=${page}`);
  }
  
  protected saveLaptopApi: (item: Laptop) => Promise<Laptop[]> = (item) => {
    return axios.post(itemUrl, item);
  }
  
  protected updateLaptopApi: (item: Laptop) => Promise<Laptop[]> = (item) => {
    return axios.put(`${itemUrl}`, item);
  }
}
