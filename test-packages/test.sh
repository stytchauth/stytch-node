#!/usr/bin/env bash

set -euo pipefail

# Start from inside this directory.
cd "$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

packages=(
    commonjs
    modules
)

for pkg in "${packages[@]}"; do
    echo "Testing ${pkg}"
    pushd "${pkg}" || exit 1
    npm install
    node index.js
    popd || exit 1
done
