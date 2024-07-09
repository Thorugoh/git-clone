import { Git } from "./git.js";

var repo = new Git("my-repo")

repo.commit("initial commit");
repo.commit("second commit");

repo.checkout("dev");


repo.commit("third commit");
console.log(repo.historyToIdMapper(repo.log()));

repo.checkout("master");
console.log(repo.historyToIdMapper(repo.log()));

console.log(repo.log());