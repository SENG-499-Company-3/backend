#!/bin/sh

# requires openapi2jsonschema via `pip install openapi2jsonschema`

openapi2jsonschema --stand-alone ../../docs/api_schema.json
rm schemas/error.json
rm schemas/all.json
npx json2ts -i ./schemas/ -o types/
