#!/bin/sh
BASEDIR=$(dirname $0)
ENV_PRE="dev-"
ENV_SUF="-dev"
SCHEME="https://"
TYPE="builder"
DOMAIN=".redbrickmakers.com/"
​
echo "Deploy to env..."
echo "1) dev  (dev-*${DOMAIN})"
echo "2) prod (    *${DOMAIN})"
read -p "-> " OPT
​
case "$OPT" in
2)
	ENV_PRE=""
	ENV_SUF=""
	;;
*) ;;
esac
echo "Deploy to bucket..."
​
while true; do
	echo "1) builder (${ENV_PRE}builder${DOMAIN})"
	echo "2) editor  (${ENV_PRE}editor${DOMAIN})"
	read -p "-> " OPT2
	if [[ $OPT2 -lt 0 ]] || [[ $OPT2 -gt 2 ]]; then
		echo "Wrong selection"
	else
		break
	fi
done
​
case "$OPT2" in
1)
	TYPE="builder"
	;;
2)
	TYPE="editor"
	;;
esac
​
echo "Deployment will be done as following :"
echo "* Target            : ${SCHEME}${ENV_PRE}${TYPE}${DOMAIN}"
echo "* Current directory : $(pwd)"
echo "* File list:"
for file in *; do
	if [ -f "$file" ]; then
		echo "    ${file}"
	else
		echo "    ${file}/"
	fi
done
read -p "Proceed? [Y/n] " OPT3
​
case "$OPT3" in
y | Y | "")
	aliyun oss rm oss://redbrick-makers-${TYPE}${ENV_SUF}/ -r -f &&
		aliyun oss cp ./ oss://redbrick-makers-${TYPE}${ENV_SUF}/ -r &&
		aliyun cdn RefreshObjectCaches --ObjectPath ${SCHEME}${ENV_PRE}${TYPE}.redbrickmakers.com/ --ObjectType Directory
	;;
n | *)
	echo "Aborting"
	exit 1
	;;
esac