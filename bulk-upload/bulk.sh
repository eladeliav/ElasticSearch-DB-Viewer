#!/bin/sh

# 0. Some constants to re-define to match your environment
ES_HOST=localhost:9200
JSON_FILE_IN=product.json
JSON_FILE_OUT=./bulk/bulk.json

# 1. Python code to transform your JSON file
PYTHON="import json,sys;
out = open('$JSON_FILE_OUT','w');
with open('$1', encoding='utf8') as json_in:
	docs = json.loads(json_in.read());
	for doc in docs:
		out.write('%s\n' % json.dumps({'index': {}}));
		out.write('%s\n' % json.dumps(doc, indent=0).replace('\n', ''));
"

# 2. run the Python script from step 1
python -c "$PYTHON"
# 3. use the output file from step 2 in the curl command
curl -s -XPOST $ES_HOST/$2/_bulk -H "Content-Type: application/json" --data-binary @$JSON_FILE_OUT
