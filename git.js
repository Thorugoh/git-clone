import { Branch } from "./branch.js";
import {Commit} from "./commit.js";

export class Git {
    constructor(name) {
        this.name = name;

        //In actual Git, commit id is a 40-hexdigit number also called as "SHA-1 id".
        this.lastCommitId = -1;
        this.branches = [];

        const master = new Branch("master", null);
        this.branches.push(master);

        this.HEAD = master;
    }

    commit(message){
        const commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

        //update the HEAD to the latest commit
        this.HEAD.commit = commit;
        return commit
    }

    checkout(branchName){
        for(let branch of this.branches){
            if(branch.name === branchName){
                this.log("Switching to existing branch ", + branchName)
                this.HEAD = branch;
                return branch;
            }
        }

        // create new branch if no branch was found
        const newBranch = new Branch(branchName, this.HEAD.commit);
        this.branches.push(newBranch);

        this.HEAD = newBranch;
        return newBranch;
    }

    log(){
        let history = []
        let commit = this.HEAD.commit;

        while(commit){
            history.push(commit);
            commit = commit.parent;
        }

        return history;
    }

    historyToIdMapper(history){
        const ids = history.map((commit) => commit.id);
        return ids.join(" - ");
    }
}