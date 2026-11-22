#!/usr/bin/env bash
# Push the staged site to GitHub and enable GitHub Pages.
# Usage: ./deploy.sh            (repo must already exist as krumbleroasters/krumbleroasters.github.io)
set -u
OWNER=krumbleroasters
REPO=krumbleroasters.github.io
DOMAIN=oncoffeelog.com
SITE_URL="https://${DOMAIN}/"
cd "$(dirname "$0")" || exit 1

echo "== remote"
git remote remove origin 2>/dev/null
git remote add origin "https://x-access-token:${GH_TOKEN}@github.com/${OWNER}/${REPO}.git"
git push -u origin main 2>&1 | sed 's/x-access-token:[^@]*@/x-access-token:***@/g'
push_rc=${PIPESTATUS[0]}
echo "push exit=${push_rc}"

echo "== pages: status"
gh api "repos/${OWNER}/${REPO}/pages" 2>&1 | head -c 400; echo

echo "== pages: enable (legacy, main / root)"
gh api -X POST "repos/${OWNER}/${REPO}/pages" \
  -f "source[branch]=main" -f "source[path]=/" 2>&1 | head -c 400; echo

echo "== pages: custom domain ${DOMAIN}"
gh api -X PUT "repos/${OWNER}/${REPO}/pages" \
  -f "cname=${DOMAIN}" -F "https_enforced=true" 2>&1 | head -c 400; echo

echo "== pages: build"
gh api -X POST "repos/${OWNER}/${REPO}/pages/builds" 2>&1 | head -c 200; echo

for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "${SITE_URL}")
  echo "poll ${i}: HTTP ${code}"
  [ "$code" = "200" ] && break
  sleep 10
done
