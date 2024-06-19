#!/bin/bash

if [ -z "$M" ]; then
  echo "Missing message"
  exit 1
fi

T="patch"

if [ "$T" != "major" ] && [ "$T" != "minor" ] && [ "$T" != "patch" ]; then
  echo "Invalid type! Please use major, minor or patch"
  exit 1
fi

skiptv=false
skipbuild=false

# Processa os argumentos passados para o script
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        --skip-tv)
        # Se a flag --skip for passada, define a variável skip como true
        skiptv=true
        ;;
        *)
        # Ignora argumentos desconhecidos (opcional)
        ;;
    esac

    case $key in
        --skip-build)
        # Se a flag --skip for passada, define a variável skip como true
        skipbuild=true
        ;;
        *)
        # Ignora argumentos desconhecidos (opcional)
        ;;
    esac
    shift
done

if [ "$skiptv" != "true" ]; then
  npx turnv tv -fp "./" "./release/app" -m "$M" -t "$T"
fi

if [ "$skipbuild" != "true" ]; then
  export $(cat .env | xargs)
  docker run --rm -it -v $(pwd)/:/app fictional npm run package:dev
fi

USERT=$(stat -c '%U' .)
chown -R "$USERT":"$USERT" ./release

sudo M="$M" -u "$USERT" bash -c '
  projectVersion=$(npx turnv gv)

  echo "projectVersion:" $projectVersion

  releaseBuildFolder="./release/build/$projectVersion"
  winExe="$releaseBuildFolder/Fictional Setup $projectVersion.exe"
  outWinExe="$releaseBuildFolder/Fictional$projectVersion.exe"
  outWinExeBlockmap="$releaseBuildFolder/Fictional Setup $projectVersion.exe.blockmap"
  outLinuxAppImage="$releaseBuildFolder/Fictional-$projectVersion.AppImage"
  outLatestLinux="$releaseBuildFolder/latest-linux.yml"
  outLatest="$releaseBuildFolder/latest.yml"

  osslsigncode sign -pkcs12 certificate.pfx -pass thisapparedream -n "Fictional" -i http://www.github.com/JPDovale -t http://timestamp.digicert.com -in "$winExe" -out "$outWinExe"

  gh release create "$projectVersion" -t "$projectVersion" -n "$M" -d
  gh release upload "$projectVersion" "$outWinExe" "$outWinExeBlockmap" "$outLinuxAppImage" "$outLatestLinux" "$outLatest"
'
