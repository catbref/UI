#!/usr/bin/env bash -e

declare -a YARN_PACKAGE_DEPS=("qortal-ui-core" "qortal-ui-plugins" "qortal-ui-crypto")
YARN_LINK_DIR="${HOME}/.config/yarn/link"

SHOW_HELP=0
FORCE_LINK=0
RUN_SERVER=0
RUN_ELECTRON=0

while [ -n "$*" ]; do
	case $1 in
    	-h)
            # Show help
			SHOW_HELP=1
			;;

    	-f)
            # Force relink and reinstall dependencies
			FORCE_LINK=1
			;;

		-s)
            # Run server after building
			RUN_SERVER=1
			;;

		-e)
            # Run electron after building
			RUN_ELECTRON=1
			;;
	esac
    shift
done

if [ "${SHOW_HELP}" -eq 1 ]; then
    echo
    echo "Usage:"
    echo "build.sh [-h] [-f] [-s] [-e]"
    echo
    echo "-h: show help"
    echo "-f: force relink and reinstall dependencies"
    echo "-s: run UI server after completing the build"
    echo "-e: run electron server after completing the build"
    echo
    exit
fi

echo "Checking dependencies..."
for PACKAGE in "${YARN_PACKAGE_DEPS[@]}"; do
    if [ "${FORCE_LINK}" -eq 1 ]; then
        echo "Unlinking ${PACKAGE}..."
        yarn --cwd "${PACKAGE}" unlink "${PACKAGE}" || true
        yarn --cwd "${PACKAGE}" unlink || true
    fi
    if [ ! -d "${YARN_LINK_DIR}/${PACKAGE}" ]; then
        echo "Installing and linking ${PACKAGE}..."
        yarn --cwd "${PACKAGE}" install
        yarn --cwd "${PACKAGE}" link
        yarn --cwd qortal-ui link "${PACKAGE}"
    else
        echo "${PACKAGE} is already linked."
    fi
done

echo "Building qortal-ui..."
yarn --cwd qortal-ui run build

if [ "${RUN_SERVER}" -eq 1 ]; then
    echo "Running UI server..."
    yarn --cwd qortal-ui run server
elif [ "${RUN_ELECTRON}" -eq 1 ]; then
    echo "Starting electron..."
    yarn --cwd qortal-ui run start-electron
fi
