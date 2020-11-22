import React from 'react';
import axios from 'axios';
import { baseUrl, config } from '../utils/Cofingurations';
import { Laptop } from '../models/Laptop';

const itemUrl = `${baseUrl}laptop`;

export const getUserLaptops: (page: number, userId: number) => Promise<any> = (page, userId) => {
  return axios.get(`${itemUrl}?page=${page}&userId=${userId}`);
}

export const getLaptops: (page: number) => Promise<any> = (page) => {
  return axios.get(`${itemUrl}?page=${page}`);
}

export const saveLaptop: (item: Laptop) => Promise<Laptop[]> = (item) => {
  return axios.post(itemUrl, item);
}

export const updateLaptop: (item: Laptop) => Promise<Laptop[]> = (item) => {
  return axios.put(`${itemUrl}/${item.id}`, item);
}