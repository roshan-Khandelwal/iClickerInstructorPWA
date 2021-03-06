import * as crypto from 'crypto-js';

export function buildRequestHeaders(user, method, body) {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };
  
    if (user) {
      let bodyLength = '0';
  
    //   if (body) {
    //     console.log(body);
    //     bodyLength = JSON.stringify(body);
    //     bodyLength = new Buffer(bodyLength);
    //     bodyLength = bodyLength.length.toString();
    //   }
  
      const authHeaders = buildAuthHeaders(user.seckey, user.auth, method, bodyLength);
      headers = Object.assign({}, authHeaders, headers);
    }
  
    return headers;
  }

export function buildAuthHeaders(seckey, userAuth, method, contentLength) {

    const date = new Date().toUTCString();
    const authStr = `${method},,application/json; charset=utf-8,${contentLength},${date}`;
  
    let seckeyHash = crypto.HmacSHA1(authStr, parseSecKey(seckey.replace(/-/g, '')));
    const seckeyB64 = crypto.enc.Base64.stringify(seckeyHash);
    const auth = `TRGN ${userAuth}:${seckeyB64}`;
    
    // return {'Date': date, 'Authorization': auth, 'Content-Length': contentLength};
    return {'Authorization': auth};
};


const parseSecKey = (sUuid) => {

    const u8arr = [];
    for (let i = 0; i < sUuid.length; i += 2) {
      u8arr.push(parseInt(sUuid.charAt(i) + sUuid.charAt(i + 1), 16));
    }
  
    const len = u8arr.length;
  
    const words = [];
    for (let i = 0; i < len; i++) {
      words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
    }
  
    return crypto.lib.WordArray.create(words, len);
  };
