![Ruby](https://github.com/driggl/linklog/workflows/Ruby/badge.svg?branch=master)
![UI](https://github.com/driggl/linklog/workflows/UI/badge.svg?branch=master)

# LinkLog

A linklog application for Modern Web developers to connect multiple blogs together

The official version is available at: https://webdevflow.com


### Running the project

This repository consists of:

- [Ruby API](https://github.com/driggl/linklog/tree/master/api)
- [Nuxt.js UI](https://github.com/driggl/linklog/tree/master/ui)

To run project in development:

**Pre-requirements:**

- Docker && docker-compose
- Ruby
- NPM

```
# clone repo
git clone git@github.com:driggl/linklog.git && cd linklog/config

# first time only: - install rubocop, build images, etc.
sh scripts/dev-setup.sh

# run all API services in the background
docker-compose up -d

# run file synchronisation
docker-sync start

#UI

cd ui
yarn install
yarn run dev
```

### Contribution

1. Fork this repo
2. Create Pull Request
