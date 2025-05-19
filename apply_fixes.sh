#!/bin/bash
# Apply the unified fixes to the project
if git apply fixes.patch; then
  echo "Patch applied successfully."
else
  echo "Failed to apply patch. Please check for conflicts."
fi
