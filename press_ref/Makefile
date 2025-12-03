.PHONY: pdf open clean help

# Default target
help:
	@echo "Ibrahim Electric Press Kit - Makefile"
	@echo ""
	@echo "Available commands:"
	@echo "  make pdf     - Generate PDF from HTML booklet"
	@echo "  make open    - Open HTML booklet in browser"
	@echo "  make clean   - Remove generated PDF"
	@echo ""

# Generate PDF
pdf:
	@echo "Generating PDF..."
	@if command -v "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" >/dev/null 2>&1; then \
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
			--headless \
			--disable-gpu \
			--print-to-pdf="Ibrahim-Electric-Press-Kit-2025.pdf" \
			--print-to-pdf-no-header \
			--no-margins \
			"file://$(shell pwd)/Ibrahim-Electric-Press-Kit-2025-Booklet.html"; \
		echo "✓ PDF created: Ibrahim-Electric-Press-Kit-2025.pdf"; \
	else \
		echo "❌ Chrome not found. Please use: Cmd+P → Save as PDF in browser"; \
		exit 1; \
	fi

# Open HTML in browser
open:
	@echo "Opening booklet in browser..."
	@open Ibrahim-Electric-Press-Kit-2025-Booklet.html

# Clean generated files
clean:
	@echo "Cleaning up..."
	@rm -f Ibrahim-Electric-Press-Kit-2025.pdf
	@echo "✓ Cleaned"
