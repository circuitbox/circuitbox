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