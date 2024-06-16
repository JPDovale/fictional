#!/bin/bash

export $(cat .env | xargs)

npm run package
