#!/bin/bash
# Install or package skills for Claude Code or Claude app
#
# Usage:
#   ./scripts/package-skill.sh [skill-name]
#
# Examples:
#   ./scripts/package-skill.sh brd-assistant
#   ./scripts/package-skill.sh                  # processes all skills

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$PROJECT_ROOT/.claude/skills"
RESOURCES_DIR="$PROJECT_ROOT/.claude/resources"
CLAUDE_CODE_SKILLS_DIR="$HOME/.claude/skills"
CLAUDE_CODE_RESOURCES_DIR="$HOME/.claude/resources"
OUTPUT_DIR="$PROJECT_ROOT/dist"

# Colours for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No colour

install_to_claude_code() {
    local skill_name="$1"
    local skill_path="$SKILLS_DIR/$skill_name"
    
    if [[ ! -d "$skill_path" ]]; then
        echo "Error: Skill '$skill_name' not found at $skill_path"
        exit 1
    fi
    
    echo -e "${BLUE}Installing skill: $skill_name${NC}"
    
    # Create Claude Code skills directory if needed
    mkdir -p "$CLAUDE_CODE_SKILLS_DIR"
    
    # Copy skill folder
    local target="$CLAUDE_CODE_SKILLS_DIR/$skill_name"
    rm -rf "$target"
    cp -R "$skill_path" "$target"
    
    # Remove .DS_Store files
    find "$target" -name '.DS_Store' -delete 2>/dev/null || true
    
    echo -e "${GREEN}✓ Installed: $target${NC}"
}

install_resources_to_claude_code() {
    if [[ -d "$RESOURCES_DIR" ]]; then
        echo -e "${BLUE}Installing shared resources${NC}"
        
        mkdir -p "$CLAUDE_CODE_RESOURCES_DIR"
        cp -R "$RESOURCES_DIR"/* "$CLAUDE_CODE_RESOURCES_DIR/"
        
        # Remove .DS_Store files
        find "$CLAUDE_CODE_RESOURCES_DIR" -name '.DS_Store' -delete 2>/dev/null || true
        
        echo -e "${GREEN}✓ Installed: $CLAUDE_CODE_RESOURCES_DIR${NC}"
    fi
}

package_for_claude_app() {
    local skill_name="$1"
    local skill_path="$SKILLS_DIR/$skill_name"
    
    if [[ ! -d "$skill_path" ]]; then
        echo "Error: Skill '$skill_name' not found at $skill_path"
        exit 1
    fi
    
    echo -e "${BLUE}Packaging skill: $skill_name${NC}"
    
    # Create output directory
    mkdir -p "$OUTPUT_DIR"
    
    # Create a temporary directory for the complete skill package
    local temp_dir=$(mktemp -d)
    local package_dir="$temp_dir/$skill_name"
    mkdir -p "$package_dir"
    
    # Copy skill files
    cp -R "$skill_path"/* "$package_dir/"
    
    # Copy shared resources into the package (so it's self-contained)
    if [[ -d "$RESOURCES_DIR" ]]; then
        mkdir -p "$package_dir/resources"
        cp -R "$RESOURCES_DIR"/* "$package_dir/resources/"
        
        # Update references in SKILL.md to use local resources path
        if [[ -f "$package_dir/SKILL.md" ]]; then
            sed -i '' 's|\.\./\.\./resources/|resources/|g' "$package_dir/SKILL.md"
        fi
    fi
    
    # Remove .DS_Store files
    find "$package_dir" -name '.DS_Store' -delete 2>/dev/null || true
    
    # Create zip
    local zip_file="$OUTPUT_DIR/${skill_name}.zip"
    rm -f "$zip_file"
    (cd "$temp_dir" && zip -rq "$zip_file" "$skill_name")
    
    # Cleanup
    rm -rf "$temp_dir"
    
    echo -e "${GREEN}✓ Created: $zip_file${NC}"
}

# Main
echo "==================================="
echo "  Skill Installer for Claude"
echo "==================================="
echo ""
echo "Where do you want to use this skill?"
echo ""
echo "  1) Claude Code (local install to ~/.claude/skills/)"
echo "  2) Claude app (package zip for upload via Settings > Capabilities > Skills)"
echo ""
read -p "Choice [1-2]: " choice

SKILL_NAME="$1"

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Installing to Claude Code...${NC}"
        echo ""
        
        if [[ -z "$SKILL_NAME" ]]; then
            for skill_dir in "$SKILLS_DIR"/*/; do
                if [[ -d "$skill_dir" ]]; then
                    skill=$(basename "$skill_dir")
                    install_to_claude_code "$skill"
                fi
            done
        else
            install_to_claude_code "$SKILL_NAME"
        fi
        
        install_resources_to_claude_code
        
        echo ""
        echo -e "${GREEN}Done!${NC}"
        echo ""
        echo "Restart Claude Code to use the skill."
        ;;
    2)
        echo ""
        echo -e "${YELLOW}Packaging for Claude app...${NC}"
        echo ""
        
        if [[ -z "$SKILL_NAME" ]]; then
            for skill_dir in "$SKILLS_DIR"/*/; do
                if [[ -d "$skill_dir" ]]; then
                    skill=$(basename "$skill_dir")
                    package_for_claude_app "$skill"
                fi
            done
        else
            package_for_claude_app "$SKILL_NAME"
        fi
        
        echo ""
        echo -e "${GREEN}Done!${NC}"
        echo ""
        echo "To upload to Claude app:"
        echo "  1. Go to claude.ai → Settings → Capabilities → Skills"
        echo "  2. Upload the zip file from: $OUTPUT_DIR"
        echo ""
        
        # Open the folder
        open "$OUTPUT_DIR"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
