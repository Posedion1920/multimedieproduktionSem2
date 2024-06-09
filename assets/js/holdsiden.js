import { getPost} from "./app.js"
import { RenderTeam} from "./app.js"
getPost(420)
.then(data=> {
    console.log(data);
    RenderTeam(data);
})