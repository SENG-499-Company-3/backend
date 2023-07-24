#!/bin/sh

# requires openapi2jsonschema via `pip install openapi2jsonschema`

openapi2jsonschema --stand-alone ../../docs/api_schema.json
npx json2ts -i schemas/ -o types/
