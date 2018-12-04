# Sntry

Sntry (/ˈsɛntɹɪ/) is a small ACL middlware for express that protects your routes.

## Getting Started

Add Sntry in your `package.json`
```
npm install --save sntry
```

Instantiate it in yor code

```
// Require the module
const Sntry = require('sntry')

// Create or load some abilities (read more about Abilities later)
const abilities = {
  'admin': {
    'products': '*'
  },
  'guest': {
    'products': ['get']
  }
}

const sntry = new Sntry(abilities)

// Tell Sntry the current user role
sntry.setUserRole('guest')

// Use the express middleware to check the route
app.use(sntry.check)

// It will chekck the current visited route against the abilities
// of the current user.
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Daniele Lenares** - (https://github.com/dnlnrs)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
