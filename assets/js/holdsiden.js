// import { getPost} from "./app.js"
// import { RenderTeam} from "./app.js"
getPost(getQueryParameter())
.then(data=> RenderTeam(data))