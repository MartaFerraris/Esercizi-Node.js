/* Terminale */

/* $ node
Welcome to Node.js v18.16.1.
    Type ".help" for more information.
> .help
            .break    Sometimes you get stuck, this gets you out
                .clear    Alias for .break
                    .editor   Enter editor mode
                        .exit     Exit the REPL
                            .help     Print this help message
                                .load     Load JS from a file into the REPL session
                                    .save     Save all evaluated commands in this REPL session to a file

Press Ctrl + C to abort current expression, Ctrl + D to exit the REPL
    > const crypto = require('crypto');
undefined
    > console.log(Object.keys(crypto));
[
    'checkPrime',
    'checkPrimeSync',
    'createCipheriv',
    'createDecipheriv',
    'createDiffieHellman',
    'createDiffieHellmanGroup',
    'createECDH',
    'createHash',
    'createHmac',
    'createPrivateKey',
    'createPublicKey',
    'createSecretKey',
    'createSign',
    'createVerify',
    'diffieHellman',
    'generatePrime',
    'generatePrimeSync',
    'getCiphers',
    'getCipherInfo',
    'getCurves',
    'getDiffieHellman',
    'getHashes',
    'hkdf',
    'hkdfSync',
    'pbkdf2',
    'pbkdf2Sync',
    'generateKeyPair',
    'generateKeyPairSync',
    'generateKey',
    'generateKeySync',
    'privateDecrypt',
    'privateEncrypt',
    'publicDecrypt',
    'publicEncrypt',
    'randomBytes',
    'randomFill',
    'randomFillSync',
    'randomInt',
    'randomUUID',
    'scrypt',
    'scryptSync',
    'sign',
    'setEngine',
    'timingSafeEqual',
    'getFips',
    'setFips',
    'verify',
    'Certificate',
    'Cipher',
    'Cipheriv',
    'Decipher',
    'Decipheriv',
    'DiffieHellman',
    'DiffieHellmanGroup',
    'ECDH',
    'Hash',
    'Hmac',
    'KeyObject',
    'Sign',
    'Verify',
    'X509Certificate',
    'secureHeapUsed',
    'constants',
    'webcrypto',
    'subtle',
    'getRandomValues'
]
undefined
    > const randomBytes = crypto.randomBytes(8).toString('hex');
undefined
    > console.log(randomBytes);
25bd2f830c3e65b6
undefined
    > */