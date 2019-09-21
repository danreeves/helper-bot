workflow "Test commits" {
  resolves = ["npm test"]
  on = "push"
}

action "npm test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "test"
}
