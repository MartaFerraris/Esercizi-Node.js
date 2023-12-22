const figlet = require("figlet"); /*import figlet from "figlet" se il file è .mjs*/

figlet("Hello Word!", {
    font: "Ghost", horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
}, function (err, data) {
    if (err) {
        return console.log("Error!");
    }
    console.log(data)
});