#!/usr/bin/env bash
# Renders resume-{ru,en}.html to assets/resume-{ru,en}.pdf via headless Chrome.
# Usage: ./resume/build.sh   (run from the repo root or anywhere — paths are resolved from this file)
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$HERE")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME (override with CHROME=/path/to/chrome)" >&2
  exit 1
fi

for lang in ru en; do
  src="$HERE/resume-$lang.html"
  out="$ROOT/assets/resume-$lang.pdf"
  "$CHROME" --headless=new --disable-gpu --no-sandbox \
    --no-pdf-header-footer --print-to-pdf-no-header \
    --print-to-pdf="$out" "file://$src" 2>/dev/null
  pages="$(pdfinfo "$out" 2>/dev/null | awk '/^Pages:/{print $2}')"
  echo "built: assets/resume-$lang.pdf${pages:+  (${pages} page(s))}"
done
