#!/usr/bin/env python3
"""
Interactive script to install skills or generate prompts for Claude

Usage:
    ./scripts/manage-skills.py

The script will guide you through:
    1. Choosing to install skills or generate prompts
    2. Selecting which skill(s) to process (or all)
    3. If installing, choosing Claude Code or Claude app destination
"""

import os
import sys
import shutil
import subprocess
import re
import tempfile
from pathlib import Path

# Colors for output
GREEN = '\033[0;32m'
BLUE = '\033[0;34m'
YELLOW = '\033[0;33m'
NC = '\033[0m'  # No color

# Get script directory and project root
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
SKILLS_DIR = PROJECT_ROOT / "skills"
RESOURCES_DIR = PROJECT_ROOT / "resources"
PROMPTS_DIR = PROJECT_ROOT / "dist" / "prompts"
CLAUDE_CODE_SKILLS_DIR = Path.home() / ".claude" / "skills"
CLAUDE_CODE_RESOURCES_DIR = Path.home() / ".claude" / "resources"
OUTPUT_DIR = PROJECT_ROOT / "dist"


def print_colored(message, color=NC):
    """Print colored message"""
    print(f"{color}{message}{NC}")


def install_to_claude_code(skill_name):
    """Install a skill to Claude Code"""
    skill_path = SKILLS_DIR / skill_name
    
    if not skill_path.is_dir():
        print(f"Error: Skill '{skill_name}' not found at {skill_path}")
        sys.exit(1)
    
    print_colored(f"Installing skill: {skill_name}", BLUE)
    
    # Create Claude Code skills directory if needed
    CLAUDE_CODE_SKILLS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Copy skill folder
    target = CLAUDE_CODE_SKILLS_DIR / skill_name
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(skill_path, target)
    
    # Remove .DS_Store files
    for ds_store in target.rglob(".DS_Store"):
        ds_store.unlink()
    
    print_colored(f"✓ Installed: {target}", GREEN)


def install_resources_to_claude_code():
    """Install shared resources to Claude Code"""
    if RESOURCES_DIR.is_dir():
        print_colored("Installing shared resources", BLUE)
        
        CLAUDE_CODE_RESOURCES_DIR.mkdir(parents=True, exist_ok=True)
        
        # Copy all resources
        for item in RESOURCES_DIR.iterdir():
            if item.is_file():
                shutil.copy2(item, CLAUDE_CODE_RESOURCES_DIR)
            elif item.is_dir():
                shutil.copytree(item, CLAUDE_CODE_RESOURCES_DIR / item.name, dirs_exist_ok=True)
        
        # Remove .DS_Store files
        for ds_store in CLAUDE_CODE_RESOURCES_DIR.rglob(".DS_Store"):
            ds_store.unlink()
        
        print_colored(f"✓ Installed: {CLAUDE_CODE_RESOURCES_DIR}", GREEN)


def template_to_prompt_name(template_file):
    """Convert template filename to prompt filename"""
    basename = template_file.stem.replace("-TEMPLATE", "")
    basename_lower = basename.lower()
    
    # Handle specific mappings
    mappings = {
        "BRD": "brd",
        "PRD": "prd",
        "CUSTOMER-JOURNEY-MAP": "customer-journey-map",
        "EXPERIENCE-MAP": "experience-map",
        "SERVICE-DESIGN-BLUEPRINT": "service-design-blueprint",
    }
    
    return mappings.get(basename, basename_lower.replace("_", "-"))


def resolve_file_path(link_path, skill_path):
    """Resolve file path from markdown link"""
    skill_path = Path(skill_path)
    
    if link_path.startswith("../"):
        # Relative path going up (e.g., ../../resources/TONE-OF-VOICE.md)
        dir_part = Path(link_path).parent
        file_part = Path(link_path).name
        try:
            resolved_dir = (skill_path / dir_part).resolve()
            return resolved_dir / file_part
        except:
            return skill_path / link_path
    elif link_path.startswith("./"):
        # Relative in current dir
        return skill_path / link_path[2:]
    else:
        # Assume in skill directory
        return skill_path / link_path


def inline_all_references(content, skill_path, exclude_templates=None):
    """Inline all external file references in content
    
    Args:
        content: The content to process
        skill_path: Path to the skill directory
        exclude_templates: List of template filenames to exclude from inlining
    """
    skill_path = Path(skill_path)
    if exclude_templates is None:
        exclude_templates = []
    
    max_iterations = 10
    iteration = 0
    
    while iteration < max_iterations:
        # Find all markdown links to .md files
        pattern = r'\[([^\]]+)\]\(([^)]+\.md)\)'
        matches = list(re.finditer(pattern, content))
        
        if not matches:
            break
        
        # Process matches in reverse order to maintain positions
        for match in reversed(matches):
            link_text = match.group(1)
            link_path = match.group(2)
            full_link = match.group(0)
            
            # Skip if this is a template we want to exclude
            link_filename = Path(link_path).name
            if link_filename in exclude_templates:
                continue
            
            # Resolve path
            resolved_path = resolve_file_path(link_path, skill_path)
            
            # Read file content if exists
            if resolved_path.is_file():
                file_content = resolved_path.read_text(encoding='utf-8')
                
                # Replace the link with file content
                start, end = match.span()
                content = content[:start] + file_content + content[end:]
        
        iteration += 1
    
    return content


def remove_frontmatter(content):
    """Remove YAML frontmatter from content"""
    lines = content.split('\n')
    if lines and lines[0].strip() == '---':
        # Find the second ---
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                return '\n'.join(lines[i+1:])
    return content


def generate_prompts_from_skill(skill_name, target_prompts_dir):
    """Generate prompts from a skill's SKILL.md file"""
    skill_path = SKILLS_DIR / skill_name
    
    if not skill_path.is_dir():
        print(f"Error: Skill '{skill_name}' not found at {skill_path}")
        return False
    
    skill_md = skill_path / "SKILL.md"
    if not skill_md.is_file():
        print(f"Warning: SKILL.md not found for {skill_name}")
        return True
    
    # Find all template files in the skill
    template_files = list(skill_path.glob("*-TEMPLATE.md"))
    
    if not template_files:
        print(f"Warning: No template files found for {skill_name}")
        return True
    
    print_colored(f"Generating prompts for: {skill_name}", BLUE)
    
    # Create prompts directory
    target_prompts_dir = Path(target_prompts_dir)
    target_prompts_dir.mkdir(parents=True, exist_ok=True)
    
    # Read SKILL.md and remove frontmatter
    skill_content = skill_md.read_text(encoding='utf-8')
    skill_content_no_frontmatter = remove_frontmatter(skill_content)
    
    # Process each template file to generate a separate prompt
    for template_file in template_files:
        template_basename = template_file.name
        prompt_name = template_to_prompt_name(template_file)
        prompt_file = target_prompts_dir / f"{prompt_name}.md"
        
        # Get list of other templates to exclude (so we only inline the current template)
        # This ensures each prompt gets SKILL.md + its specific template + resources
        other_templates = [t.name for t in template_files if t != template_file]
        
        # Inline all external file references in SKILL.md
        # Exclude other templates so each prompt is focused on its specific template
        combined_content = inline_all_references(
            skill_content_no_frontmatter, 
            skill_path, 
            exclude_templates=other_templates
        )
        prompt_file.write_text(combined_content, encoding='utf-8')
        
        print_colored(f"  ✓ {prompt_name}.md (from SKILL.md with all references inlined)", GREEN)
    
    # Remove .DS_Store files
    for ds_store in target_prompts_dir.rglob(".DS_Store"):
        ds_store.unlink()
    
    return True


def generate_all_prompts(target_prompts_dir):
    """Generate prompts from all skills"""
    print_colored("Generating prompts from all skills", BLUE)
    
    target_prompts_dir = Path(target_prompts_dir)
    target_prompts_dir.mkdir(parents=True, exist_ok=True)
    
    # Process each skill directory
    for skill_dir in SKILLS_DIR.iterdir():
        if skill_dir.is_dir():
            skill_name = skill_dir.name
            generate_prompts_from_skill(skill_name, target_prompts_dir)
    
    print_colored(f"✓ Generated all prompts in: {target_prompts_dir}", GREEN)


def package_for_claude_app(skill_name):
    """Package a skill for Claude app"""
    skill_path = SKILLS_DIR / skill_name
    
    if not skill_path.is_dir():
        print(f"Error: Skill '{skill_name}' not found at {skill_path}")
        sys.exit(1)
    
    print_colored(f"Packaging skill: {skill_name}", BLUE)
    
    # Get git commit hash for versioning
    version = ""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True,
            text=True,
            cwd=PROJECT_ROOT
        )
        if result.returncode == 0:
            version = f"-{result.stdout.strip()}"
    except:
        print_colored("Warning: Not in a git repository. Skipping version in filename.", YELLOW)
    
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Create a temporary directory for the complete skill package
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        package_dir = temp_path / skill_name
        package_dir.mkdir()
        
        # Copy skill files
        for item in skill_path.iterdir():
            if item.name != ".DS_Store":
                if item.is_file():
                    shutil.copy2(item, package_dir)
                elif item.is_dir():
                    shutil.copytree(item, package_dir / item.name)
        
        # Copy shared resources into the package
        if RESOURCES_DIR.is_dir():
            resources_dir = package_dir / "resources"
            resources_dir.mkdir()
            for item in RESOURCES_DIR.iterdir():
                if item.is_file():
                    shutil.copy2(item, resources_dir)
                elif item.is_dir():
                    shutil.copytree(item, resources_dir / item.name)
            
            # Update references in SKILL.md to use local resources path
            skill_md = package_dir / "SKILL.md"
            if skill_md.is_file():
                content = skill_md.read_text(encoding='utf-8')
                content = re.sub(r'\.\./\.\./resources/', 'resources/', content)
                content = re.sub(r'\.\./resources/', 'resources/', content)
                skill_md.write_text(content, encoding='utf-8')
        
        # Generate prompts folder from all skill templates
        generate_all_prompts(package_dir / "prompts")
        
        # Remove .DS_Store files
        for ds_store in package_dir.rglob(".DS_Store"):
            ds_store.unlink()
        
        # Create zip with version in filename
        zip_file = OUTPUT_DIR / f"{skill_name}{version}.zip"
        if zip_file.exists():
            zip_file.unlink()
        
        shutil.make_archive(str(zip_file.with_suffix('')), 'zip', temp_path, skill_name)
    
    print_colored(f"✓ Created: {zip_file}", GREEN)


def get_available_skills():
    """Get list of available skills"""
    skills = []
    for skill_dir in SKILLS_DIR.iterdir():
        if skill_dir.is_dir():
            skills.append(skill_dir.name)
    return sorted(skills)


def select_skill():
    """Display skill selection menu and get choice"""
    skills = get_available_skills()
    
    print()
    print("Available skills:")
    print()
    
    for index, skill in enumerate(skills, 1):
        print(f"  {index}) {skill}")
    
    all_index = len(skills) + 1
    print(f"  {all_index}) All skills")
    print()
    
    while True:
        try:
            choice = input(f"Select skill [1-{all_index}]: ").strip()
            choice_num = int(choice)
            if 1 <= choice_num <= all_index:
                if choice_num == all_index:
                    return "all"
                else:
                    return skills[choice_num - 1]
            else:
                print("Invalid choice. Please try again.")
        except ValueError:
            print("Invalid choice. Please enter a number.")
        except KeyboardInterrupt:
            print("\nExiting.")
            sys.exit(0)


def main():
    """Main function"""
    print("===================================")
    print("  Claude Skills Manager")
    print("===================================")
    print()
    print("What would you like to do?")
    print()
    print("  1) Install skills (Claude Code or Claude app)")
    print("  2) Generate prompts")
    print()
    
    while True:
        try:
            main_choice = input("Choice [1-2]: ").strip()
            if main_choice in ['1', '2']:
                break
            else:
                print("Invalid choice. Please enter 1 or 2.")
        except KeyboardInterrupt:
            print("\nExiting.")
            sys.exit(0)
    
    # Get skill selection
    selected_skill = select_skill()
    
    if main_choice == "1":
        # Install skills path
        print()
        print("Where do you want to install the skill(s)?")
        print()
        print("  1) Claude Code (local install to ~/.claude/skills/)")
        print("  2) Claude app (package zip for upload via Settings > Capabilities > Skills)")
        print()
        
        while True:
            try:
                install_choice = input("Choice [1-2]: ").strip()
                if install_choice in ['1', '2']:
                    break
                else:
                    print("Invalid choice. Please enter 1 or 2.")
            except KeyboardInterrupt:
                print("\nExiting.")
                sys.exit(0)
        
        if install_choice == "1":
            print()
            print_colored("Installing to Claude Code...", YELLOW)
            print()
            
            if selected_skill == "all":
                for skill_dir in SKILLS_DIR.iterdir():
                    if skill_dir.is_dir():
                        install_to_claude_code(skill_dir.name)
            else:
                install_to_claude_code(selected_skill)
            
            install_resources_to_claude_code()
            
            # Generate prompts folder from all skill templates
            generate_all_prompts(PROMPTS_DIR)
            
            print()
            print_colored("Done!", GREEN)
            print()
            print("Restart Claude Code to use the skill(s).")
        else:
            print()
            print_colored("Packaging for Claude app...", YELLOW)
            print()
            
            if selected_skill == "all":
                for skill_dir in SKILLS_DIR.iterdir():
                    if skill_dir.is_dir():
                        package_for_claude_app(skill_dir.name)
            else:
                package_for_claude_app(selected_skill)
            
            print()
            print_colored("Done!", GREEN)
            print()
            print("To upload to Claude app:")
            print(f"  1. Go to claude.ai → Settings → Capabilities → Skills")
            print(f"  2. Upload the zip file(s) from: {OUTPUT_DIR}")
            print()
            
            # Open the folder (macOS)
            if sys.platform == "darwin":
                subprocess.run(["open", str(OUTPUT_DIR)])
    else:
        # Generate prompts path
        print()
        print_colored("Generating prompts...", YELLOW)
        print()
        
        if selected_skill == "all":
            generate_all_prompts(PROMPTS_DIR)
        else:
            generate_prompts_from_skill(selected_skill, PROMPTS_DIR)
        
        print()
        print_colored("Done!", GREEN)
        print()
        print(f"Prompts generated in: {PROMPTS_DIR}")


if __name__ == "__main__":
    main()

