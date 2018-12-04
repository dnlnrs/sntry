class Suspect {
  constructor (abilities, userRole) {
    this.roleAbilities = abilities[userRole]

    this.can = this.can.bind(this)
  }

  can (path, method, roleAbilities) {
    const currentAbilities = roleAbilities || this.roleAbilities
    const rolePaths = Object.keys(currentAbilities)
    let isPermitted = false
    rolePaths.forEach(singleAbility => {
      console.log(singleAbility)
      if (path.includes(singleAbility) || singleAbility === '_self') {
        const abilityPermissions = currentAbilities[singleAbility]
        if (typeof abilityPermissions === 'string') {
          if (abilityPermissions === '*' || abilityPermissions === method) {
            isPermitted = true
          }
        } else if (Array.isArray(abilityPermissions)) {
          abilityPermissions.forEach(permittedMethod => {
            if (permittedMethod === method) {
              isPermitted = true
            }
          })
        } else if (typeof abilityPermissions === 'object') {
          isPermitted = this.can(path, method, abilityPermissions)
        }
      }
    })
    return isPermitted
  }
}

module.exports = Suspect
