#! /usr/bin/env bash

# Prerequisites
#
#   Make sure you have the following installed:
#
#     - a recent ruby (needed for rubocop, overcommit and docker-sync)
#     - brew (needed to install missing tools)
#     - docker
#
# Usage:
#
#   mkdir wdf && cd wdf
#   git clone git@gitlab.com:driggl/wdf-api.git api && cd api
#   sh scripts/dev_setup.sh
#

RUBOCOP_VERSION="0.77.0"
RUBOCOP_PERFORMANCE_VERSION="1.5.1"
RUBOCOP_RAILS_VERSION="2.4.0"

echo ---------------------- Building docker images for development ----------------------
docker build -t wdf/api:dev -f docker/Dockerfile .
docker build -t wdf/api:test -f docker/Dockerfile.test .

echo ---------------------- Setting up database ----------------------

echo ---------------------- Installing docker-sync ----------------------
if ! [ -x "$(command -v docker-sync)" ]; then
  gem install docker-sync
fi

docker-sync start
docker-compose run --rm api rake db:reset
docker-compose run --rm api rake db:setup
docker-compose run --rm api rake db:migrate
docker-compose run --rm specs rake db:create
docker-compose run --rm specs rake db:test:load
docker-sync stop

echo ---------------------- Installing gems ----------------------
if ! [ -x "$(command -v rubocop)" ]; then
  gem install rubocop -v $RUBOCOP_VERSION
  gem install rubocop-performance -v $RUBOCOP_PERFORMANCE_VERSION
  gem install rubocop-rails -v $RUBOCOP_RAILS_VERSION

fi

if ! [ -x "$(command -v solargraph)" ]; then
  gem install solargraph
fi

if ! [ -x "$(command -v overcommit)" ]; then
  gem install overcommit
fi

echo
echo ---------------------- Web Dev Flow development setup completed ----------------------
