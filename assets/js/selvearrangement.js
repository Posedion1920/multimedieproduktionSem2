// import { getPost} from "./app.js"
// import {getQueryParameter} from "./app.js"
// import {RenderEvent} from "./app.js"

getPost(getQueryParameter())
.then(data =>  RenderEvent(data))
