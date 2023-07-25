#!/bin/sh

# requires openapi2jsonschema via `pip install openapi2jsonschema`

openapi2jsonschema --stand-alone ../../docs/api_schema.json
# remove the files that cause reference/lookup errors due to infinite recursion
rm schemas/error.json
rm schemas/all.json
npx json2ts -i ./schemas/ -o types/
