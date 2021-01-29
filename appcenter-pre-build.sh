#!/usr/bin/env bash
echo "BUMPING PATCH VERSION"
npm version patch
echo "DONE BUMPING"
echo "COMMIT PATCH VERSION"
npm run commit-version
echo "DONE COMMIT"
