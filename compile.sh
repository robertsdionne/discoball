#!/bin/sh
java -jar lib/closure-compiler/compiler.jar \
  --compilation_level ADVANCED_OPTIMIZATIONS \
  --externs src/externs.js \
  --js src/base.js \
  --js src/quaternion.js \
  --js src/vector.js \
  --js src/dualnumber.js \
  --js src/dualquaternion.js \
  --js src/dualvector.js \
  --js src/ball.js \
  --js src/app.js \
  --js src/program.js \
  --js src/renderer.js \
  --js src/shader.js \
  --js src/keys.js \
  --js src/palette.js \
  --js src/pose.js \
  --js src/discoball.js \
  --js_output_file discoball.js
