#!/bin/bash

# Script to render HTML press kit to PDF using Chrome/Chromium

INPUT_HTML="Ibrahim-Electric-Press-Kit-2025-Booklet.html"
OUTPUT_PDF="Ibrahim-Electric-Press-Kit-2025.pdf"

echo "Rendering $INPUT_HTML to PDF..."

# Check if Chrome is available
if command -v "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" &> /dev/null; then
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        --headless \
        --disable-gpu \
        --print-to-pdf="$OUTPUT_PDF" \
        --print-to-pdf-no-header \
        --no-margins \
        "file://$(pwd)/$INPUT_HTML"
    echo "✓ PDF created: $OUTPUT_PDF"
elif command -v chromium &> /dev/null; then
    chromium \
        --headless \
        --disable-gpu \
        --print-to-pdf="$OUTPUT_PDF" \
        --print-to-pdf-no-header \
        --no-margins \
        "file://$(pwd)/$INPUT_HTML"
    echo "✓ PDF created: $OUTPUT_PDF"
else
    echo "❌ Chrome/Chromium not found. Please install Chrome or use Print to PDF manually."
    echo "   In browser: Cmd+P → Save as PDF"
    exit 1
fi
