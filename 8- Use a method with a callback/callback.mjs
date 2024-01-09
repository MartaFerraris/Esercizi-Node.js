import * as fs from "node:fs";

fs.writeFile("file.txt", {encoding: "utf-8"} , function (error, data) {
    if(error) {
        console.error(error);
        return;
    }

    console.log(data)
});


/* write(fd, Buffer.from(data, options.encoding), callback);  */