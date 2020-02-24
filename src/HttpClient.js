'use strict';

import axios from 'axios';

export default class HttpClient {
  static async get(query) {
    let res = await axios.get(query);
    return res.data;
  }
}
