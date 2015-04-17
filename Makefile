#
# circuitbox
# Copyright (c) 2014 - 2015 Ranganath Kini <codematix@codematix.me>
# Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
# MIT Licensed
#

BIN = ./node_modules/.bin
LIB = $(shell find ./lib -name '*.js')
REPORTER = ./node_modules/jshint-stylish/stylish.js
TESTS = $(shell find ./test -name '*.test.js')
MOCHA_OPTS=-u bdd -b

all: lint test

lint: $(LIB)
	@$(BIN)/jshint --reporter=$(REPORTER) -c ./.jshintrc $?

test: $(TESTS)
	@$(BIN)/mocha $(MOCHA_OPTS) $?

.PHONY: lint test all