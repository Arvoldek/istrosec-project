#!/bin/bash

# Performance Test Runner
# Phase 5: Performance Tests for httpbin.org

# Configuration
# Try common Homebrew paths (Apple Silicon and Intel Mac)
JMETER_HOME=/opt/homebrew/opt/jmeter
if [ ! -d "$JMETER_HOME" ]; then
  JMETER_HOME=/usr/local/opt/jmeter
fi
if [ ! -d "$JMETER_HOME" ]; then
  echo "JMeter not found. Please install JMeter first."
  echo "On macOS: brew install jmeter"
  exit 1
fi

# Test configuration
TEST_PLAN="tests/performance/httpbin.jmx"
OUTPUT_DIR="reports/performance"
RESULTS_FILE="$OUTPUT_DIR/results.jtl"
HTML_REPORT="$OUTPUT_DIR/report"

# Clean previous results
rm -rf "$OUTPUT_DIR"/*

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Run JMeter tests
echo "Running performance tests..."
echo "JMeter home: $JMETER_HOME"
echo "Test plan: $TEST_PLAN"
echo "Output directory: $OUTPUT_DIR"

"$JMETER_HOME/bin/jmeter" \
  -n \
  -t "$TEST_PLAN" \
  -l "$RESULTS_FILE" \
  -e \
  -o "$HTML_REPORT"

if [ $? -eq 0 ]; then
  echo "Performance tests completed successfully."
  echo "Report generated at: $HTML_REPORT/index.html"
else
  echo "Performance tests failed."
  exit 1
fi
