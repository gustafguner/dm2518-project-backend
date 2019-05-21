import * as crypto from 'crypto';

interface Keys {
  pubKey: string;
  privKey: string;
}

const test = () => {
  return new Promise<Keys>((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({ pubKey: publicKey, privKey: privateKey });
        }
      },
    );
  });
};

const encryptStringWithRsaPublicKey = (toEncrypt: string, publicKey: any) => {
  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

const decryptStringWithRsaPrivateKey = (toDecrypt: any, privateKey: any) => {
  const buffer = Buffer.from(toDecrypt, 'base64');
  console.log(privateKey);
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

export { encryptStringWithRsaPublicKey, decryptStringWithRsaPrivateKey, test };
