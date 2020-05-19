# API

## Running Development envrionment

The application is fully dockerised and all dependencies are configured
using docker-compose tool.

To run this app in development, you'll need:

1. Docker
2. Recent version of ruby installed (for rubocop, docker-compose, etc)

```shell
# Setup the databases, build images, install rubocop, etc.
sh scripts/dev_setup.sh

# Run the app
docker-sync start && docker-compose up -d

# stop the app
docker-sync stop && docker-compose down
```

## Running tests

1. Start the app
2. Run the test suit

```shell
docker-compose exec -it specs rspec

# You can also log into the container shell and run tests from there:
docker-compose exec -it specs bash
rspec
```

You can also run tests without running the whole app:

docker-compose run --rm specs rspec
