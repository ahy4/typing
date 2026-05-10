#!/bin/bash
cd /home/user/typing

ERRORS=()

# ESLint
if ! npm run lint >/dev/null 2>&1; then
  ERRORS+=("ESLint")
fi

# Biome
if ! npx biome check . >/dev/null 2>&1; then
  ERRORS+=("Biome")
fi

# Build (tsc + vite)
if ! npm run build >/dev/null 2>&1; then
  ERRORS+=("Build")
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
  JOINED=$(IFS=", "; echo "${ERRORS[*]}")
  echo "{\"decision\": \"block\", \"reason\": \"以下のチェックが失敗しています: ${JOINED}。修正してから完了としてください。\"}"
fi
