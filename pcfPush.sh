GIT_COMMIT="$(git log --date=format:'%Y/%m/%d %A @ %H:%M:%S' -1 --format='%cd %H %B')"
echo "Setting env GIT_COMMIT=$GIT_COMMIT"

GIT_COMMIT_CLEANED="$(echo $GIT_COMMIT | tr '\r\n' ' ' | tr -dc '[:alnum:] .@-')"
echo "GIT_COMMIT_CLEANED"
echo "$GIT_COMMIT_CLEANED"
echo " "

PCF_PUSH_TIMESTAMP="$(date '+%Y/%m/%d %A @ %H:%M:%S %Z')"
echo "Setting env PCF_PUSH_TIMESTAMP=$PCF_PUSH_TIMESTAMP"

cf push -f manifest.yml --var GIT_COMMIT="$GIT_COMMIT_CLEANED" --var PCF_PUSH_TIMESTAMP="$PCF_PUSH_TIMESTAMP"