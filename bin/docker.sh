#!/bin/bash

cd "$(dirname "$0")/.."

# ==================================================================================
# Docker compose
# ==================================================================================
function _compose {
    /usr/bin/env docker-compose "$@"
}

# ==================================================================================
# Docker
# ==================================================================================
function _docker {
    /usr/bin/env docker "$@"
}

# ==================================================================================
# Commands
# ==================================================================================
BIN_DIR="$(cd $(dirname "$0") && pwd)"
BASE_DIR="$(dirname "$BIN_DIR")"
IMAGES=$(_compose images | grep "$(basename $PWD)-app" | awk '{ print $2 }')

case ${1} in
    start)
        _compose build \
            --no-cache --pull &&
        _compose up \
            --force-recreate && \
            $0 logs
        ;;

    stop)
        _compose stop --timeout 30
        ;;

    restart)
        $0 stop
        $0 start
        ;;

    build)
        $0 rm
        $0 start
        ;;

    logs)
        _compose logs -f
        ;;

    rm)
        _compose stop --timeout 30 && _compose rm -f && _docker rmi "${IMAGES}"
        ;;

    sh)
        _docker exec -it --detach-keys 'ctrl-q,q' app sh
        ;;
esac
