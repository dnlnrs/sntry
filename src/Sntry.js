const Suspect = require('./Suspect')

class Sntry {
  constructor (abilities) {
    this.abilities = abilities

    this.loadAbilities = this.loadAbilities.bind(this)
    this.check = this.check.bind(this)
    this.setUserRole = this.setUserRole.bind(this)
  }

  loadAbilities (abilityLoader) {
    if (typeof abilityLoader !== 'function') throw new Error('cb must be a function')
    this.abilities = abilityLoader()
  }

  setUserRole (userRole) {
    this.userRole = userRole
  }

  check (req, res, next) {
    if (!this.abilities) throw new Error('Sntry needs some abilities to check.')
    const suspect = new Suspect(this.abilities, this.userRole || req.user.role)
    if (!suspect.can(req.path, req.method.toLowerCase())) {
      const err = new Error('Not authorized!')
      err.statusCode = 403
      return next(err)
    }
    return next()
  }
}

module.exports = Sntry
