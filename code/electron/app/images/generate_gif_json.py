import json, os, sys, pprint

# run this python script to generate a json object with all local gifs

gifParentFolder = 'local'
path = os.path.dirname(os.path.abspath(__file__))

localGifs = {}

for dirname, dirs, filenames in os.walk(os.path.join(path, gifParentFolder)):
	for d in dirs:
		list_of_gifs = []
		for dirname2, dirs2, filenames2 in os.walk(os.path.join(path, gifParentFolder, d)):
			# list_of_gifs.append(filenames2)
			# pprint.pprint(filenames2)
			localGifs[d] = filenames2

pprint.pprint(localGifs)

with open(os.path.join(path, "local_gifs.json"),"w") as c:
 	json.dump(localGifs, c)