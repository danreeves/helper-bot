workflow "Test commits" {
  resolves = ["npm install", "npm test"]
  on = "push"
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm ci"
}

action "npm test" {
  needs = "npm install"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm test"
}
