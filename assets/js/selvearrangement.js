import { GetSinglePost} from "./app.js"
import {getQueryParameter} from "./app.js"
import {RenderEvent} from "./app.js"

GetSinglePost(getQueryParameter())
.then(data => {
    console.log(data);
    RenderEvent(data)
})
