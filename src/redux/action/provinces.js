import axios from 'axios';
import { API_KEY } from '../../utils/apis';

export const getProvinces = (url,apikey) => ({
    type: 'GET_PROVINCES',
    payload: axios.get(url, {
        headers: {
            'Authorization': API_KEY
        }
    })
})

export const setAlamatAsal = (id,asal) => ({
        type: 'SET_ASAL',
        id:id,
        asal:asal
})

export const setAlamatTujuan = (tujuan,destination) => ({
    type: 'SET_TUJUAN',
    tujuan:tujuan,
    destination:destination
})