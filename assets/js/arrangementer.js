
import {getCategory} from "./app.js"
import {RenderCards} from "./app.js"
getCategory(11)
.then(data => {
    RenderCards(data,false);
})
.catch(err => console.log(err))


