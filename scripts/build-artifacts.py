#!/usr/bin/env python3
"""
Non-interactive script to generate all prompts and zip files for GitHub Pages

Usage:
    python scripts/build-artifacts.py

This script:
    1. Generates all prompts from all skills
    2. Packages all skills as zip files for Claude app
    3. Outputs everything to dist/ and prompts/ directories
"""

import sys
import importlib.util
from pathlib import Path

# Import functions from manage-skills.py
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent

# Load manage-skills.py as a module (handles hyphen in filename)
spec = importlib.util.spec_from_file_location("manage_skills", SCRIPT_DIR / "manage-skills.py")
manage_skills = importlib.util.module_from_spec(spec)
sys.modules["manage_skills"] = manage_skills
spec.loader.exec_module(manage_skills)

# Import needed functions and constants
generate_all_prompts = manage_skills.generate_all_prompts
package_for_claude_app = manage_skills.package_for_claude_app
get_available_skills = manage_skills.get_available_skills
PROMPTS_DIR = manage_skills.PROMPTS_DIR
OUTPUT_DIR = manage_skills.OUTPUT_DIR
SKILLS_DIR = manage_skills.SKILLS_DIR


def main():
    """Generate all artifacts non-interactively"""
    print("Generating all artifacts for GitHub Pages...")
    print()
    
    # Generate all prompts
    print("Step 1: Generating prompts...")
    generate_all_prompts(PROMPTS_DIR)
    print()
    
    # Package all skills as zip files
    print("Step 2: Packaging skills as zip files...")
    skills = get_available_skills()
    for skill_name in skills:
        package_for_claude_app(skill_name)
    print()
    
    print("✓ All artifacts generated successfully!")
    print(f"  Prompts: {PROMPTS_DIR}")
    print(f"  Zip files: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

