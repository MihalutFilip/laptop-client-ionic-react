import React from 'react';
import axios from 'axios';
import { baseUrl, config } from '../utils/Cofingurations';

const authUrl = `${baseUrl}/login`;

export const login: (username?: string, password?: string) => Promise<any> = (username, password) => {
    return axios.post(authUrl, { username, password }, config);
}