
import {getPostsByCategory} from "./app.js"
import {RenderCards} from "./app.js"
getPostsByCategory(11)
.then(data => RenderCards(data,false))
.catch(err => console.log(err))


