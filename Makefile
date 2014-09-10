SHELL=/bin/bash

.PHONY : test coverage

all: test coverage

test:
	./node_modules/karma/bin/karma start .karma.travis.js

coverage:
	CODECLIMATE_REPO_TOKEN=cdfb58c2403e51a96fc4d749895c0441319636544965da40b52dac2d5bc93f97 ./node_modules/codeclimate-test-reporter/bin/codeclimate.js < ./coverage/PhantomJS\ 1.9.7\ \(Linux\)/lcov.info
