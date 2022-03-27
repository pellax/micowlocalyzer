#!/bin/bash
GREEN="\033[0;32m"
RED="\033[0;31m"
ORANGE="\033[0;33m"
PURPLE="\033[0;35m"
NC="\033[0m"
ES_SERVER="https://localhost:9200"

reindex() {
	echo -e "$GREEN Reindexing from $1 to $2 $NC"
	curl -X POST "$ES_SERVER/_reindex" \
	-H "Content-Type:application/json" \
	-d @<(
		cat <<EOF
		{
		  "source": {
		    "index": "$1"
		  },
		  "dest": {
		    "index": "$2"
		  }
		}
	EOF
	)
}
delete_index() {
	echo -e "$RED Deleting the $1 index $2$NC"
	curl -X DELETE $ES_SERVER/$2
}
cool() {
	echo -e "\n$PURPLE Giving cooling time to ES Server for $1 seconds $NC"
	sleep $1s;
}
while [ $# -gt 0 ]
do
	case "$1" in
		-url) ES_SERVER="$2" ;  shift ;;
		--) shift; break ;;
		*) break ;;
	esac
	shift
done
# Validating the URL and DB names inputs
if [ -z "$ES_SERVER" ]
then
  echo -e "$RED Elasticsearch URL should be passed like:  -url http://localhost:9200 $NC"
  exit 1
fi
read -p "$(echo -e $PURPLE Using $ES_SERVER URL for re-indexing operation, Are you sure to proceed? $NC)" $REPLY
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
	set -e
	# Collecting all the indicies
	echo -e "$GREEN Using $ES_SERVER as endpoint url and storing the index to ./index.yaml$NC"
	echo -e "$RED"
	curl $ES_SERVER/_cat/indices > ./index.yaml
	echo -e "$NC"
	# Segregating red indicies
	echo -e "$GREEN Segregating the red indices from overall index list and storing to ./red-index.yaml$NC"
	cat ./index.yaml | grep red > ./red-index.yaml
	# reading and iterating over the red indicies
	while read ind; do
		index=$(echo $ind | awk '{print $3}')
		newIndex=$index"_new"
		echo -e "$ORANGE Working on the index: $index$NC"
		echo -e "$ORANGE New Index will be $newIndex$NC"
		
		reindex $index $newIndex
		cool 1
		delete_index "original" $index
		cool 1
		reindex $newIndex $index
		cool 1
		delete_index "duplicated" $newIndex
		cool 1
		echo -e "$GREEN Done with the index $index $NC"
		echo ""
		echo ""
	done <./red-index.yaml
else
	echo -e "$ORANGE Aborting operation$NC"
fi
echo "Cleaning up the local files...."
rm ./index.yaml
rm ./red-index.yaml 
