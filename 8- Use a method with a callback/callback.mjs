import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('file.txt', data, (err) => {
    if (err) throw err;
    console.log('The file is writed.');
});

/* write(fd, Buffer.from(data, options.encoding), callback);  */