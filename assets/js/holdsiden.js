// import { getPost} from "./app.js"
// import { RenderTeam} from "./app.js"
getPost(getQueryParameter())
.then(data=> {
    console.log(data);
    RenderTeam(data);
})