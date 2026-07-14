import app from "./app.js";

import "./databas.js"

async function main(){
    app.listen(400)
    console.log("server on port 400")
}

main()