function getRepositories() {
    let usernameQ = document.getElementById('username').value

    const req = new XMLHttpRequest()
    req.addEventListener('load', displayRepositories)
    req.open('GET', `https://api.github.com/users/${usernameQ}/repos`)
    // req.open('GET', `https://api.github.com/users/${usernameQ}`)
    req.send()


    //first you do the new request
    // then add event listener that calls the show function
    // then .open
    // then .send
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText)

    const repoList = `<ul>${repos
        .map(
            r =>
                '<li>' +
                'https://github.com/' +
                r.owner.login +
                '/' +
                r.name +
                ' - <a href="#" data-repository="' +
                r.name +
                '" data-username="' +
                r.owner.login +
                '" onclick="getCommits(this);return false">Get Commits</a>' +
                ' - <a href="#" data-repository="' +
                r.name +
                '" data-username="' +
                r.owner.login +
                '" onclick="getBranches(this);return false">Get Branches</a></li>'
        )
        .join('')}</ul>`
    document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
    const repository = el.dataset.repository
    const username = el.dataset.username
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayCommits)
    req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`)
    req.send()

}

function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits
        .map(
            commit => 
            '<li><strong>' +
            commit.commit.author.name +
            '</strong> - ' +
            commit.author.login +
            ' - ' +
            commit.commit.message +
            '</li>'
        )
        .join('')}</ul>`
    document.getElementById('details').innerHTML = commitsList
}

function getBranches(el) {
    const repository = el.dataset.repository
    const username = el.dataset.username
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayBranches)
    req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`)
    req.send()

}

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches
        .map(
            branch => 
            '<li>' +
            branch.name +
            '</li>'
        )
        .join('')}</ul>`
    document.getElementById('details').innerHTML = branchesList
}