import axios from 'axios';

export default class Server {
  static baseAddress = 'https://us-central1-hyperreader.cloudfunctions.net/app';

  static async getUids(token) {
    const query = Server.baseAddress + '/getuids?' + 'token=' + token;
    const res = await axios.get(query);
    return res.data;
  }

  static async addUid(userid, token) {
    const query =
      Server.baseAddress + '/adduid?' + 'userid=' + userid + '&token=' + token;
    const res = await axios.get(query);
    return res.data;
  }

  static async removeUid(userid) {
    const query = Server.baseAddress + '/removeuid?' + 'userid=' + userid;
    const res = await axios.get(query);
    return res.data;
  }

  static async uidScript() {
    const query = Server.baseAddress + '/uidscript';
    const res = await axios.get(query);
    return res.data;
  }
}
