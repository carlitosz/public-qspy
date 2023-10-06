#!/usr/bin/env bash

function display_help {
  echo "Spy"
  echo
  echo "Usage:" >&2
  echo "  spy COMMAND [options] [arguments]"
  echo
  echo "docker-compose Commands:"
  echo "  spy up        Start the application"
  echo "  spy up -d     Start the application in the background"
  echo "  spy stop      Stop the application"
  echo "  spy down      Stop the application and remove related resources"
  echo "  spy restart   Restart the application"
  echo "  spy ps        Display the status of all containers"
  echo "  spy sh        Enter interactive mode"
  echo

  exit 1
}

if [ $# -gt 0 ]; then
  if [ "$1" == "help" ] || [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    display_help
  elif [ "$1" == "sh" ]; then
    docker exec -it --detach-keys 'ctrl-q,q' next-app sh
  else
    docker-compose -f qspy/docker-compose.dev.yml "$@"
  fi
else
  display_help
fi
