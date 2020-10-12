const axios = require('axios');

const jenkinsAxios = axios.create({
  baseURL: 'http://192.168.19.25:8080/',
  headers: { 'Jenkins-Crumb': '618ab4315174fea503ccaa63cb410198aad93c3ff85970de57566bb24f3a8322' }
})

const jenkins = async () => {
  try {
    const { data } = await jenkinsAxios({
      url: 'job/4d-anta-material/api/json',
      methods: 'get',
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }

}

module.exports = { jenkins }

