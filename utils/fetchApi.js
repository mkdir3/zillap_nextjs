import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'ef13de9870mshfb1027ab2eea3dap1f6bc8jsn73dc2b6b0ed9'
          }
    });

    return data;
}