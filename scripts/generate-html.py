#!/usr/bin/env python3
"""
Generate HTML UI page for GitHub Pages

This script creates an index.html file that displays:
- All prompts with copy-to-clipboard functionality
- All zip files with download links
"""

import json
import base64
from pathlib import Path
from datetime import datetime


def escape_html(text):
    """Escape HTML special characters"""
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
            .replace("'", "&#x27;"))


def generate_html(prompts_dir, dist_dir, output_file):
    """Generate the HTML UI page"""
    
    prompts_dir = Path(prompts_dir)
    dist_dir = Path(dist_dir)
    output_file = Path(output_file)
    
    # Find all prompt files
    prompt_files = sorted(prompts_dir.glob("*.md")) if prompts_dir.exists() else []
    
    # Find all zip files
    zip_files = sorted(dist_dir.glob("*.zip")) if dist_dir.exists() else []
    
    def get_preview(content, max_length=200):
        """Extract a readable preview from markdown content"""
        # Remove frontmatter if present
        lines = content.split('\n')
        start_idx = 0
        if lines and lines[0].strip() == '---':
            # Find the end of frontmatter
            for i in range(1, len(lines)):
                if lines[i].strip() == '---':
                    start_idx = i + 1
                    break
        
        # Get content after frontmatter
        content_after_frontmatter = '\n'.join(lines[start_idx:])
        
        # Remove markdown headers and get first meaningful text
        preview_lines = []
        for line in content_after_frontmatter.split('\n'):
            line = line.strip()
            # Skip empty lines, headers, and code blocks at the start
            if not line or line.startswith('#') or line.startswith('```'):
                continue
            # Remove markdown formatting
            line = line.replace('**', '').replace('*', '').replace('`', '')
            preview_lines.append(line)
            if len(' '.join(preview_lines)) >= max_length:
                break
        
        preview = ' '.join(preview_lines)
        # Clean up multiple spaces
        preview = ' '.join(preview.split())
        
        # Truncate to max_length
        if len(preview) > max_length:
            preview = preview[:max_length].rsplit(' ', 1)[0] + "..."
        
        return preview if preview else "No preview available"
    
    # Read prompt contents
    prompts_data = []
    for prompt_file in prompt_files:
        try:
            content = prompt_file.read_text(encoding='utf-8')
            preview = get_preview(content)
            prompts_data.append({
                'name': prompt_file.stem,
                'filename': prompt_file.name,
                'content': content,
                'preview': preview
            })
        except Exception as e:
            print(f"Warning: Could not read {prompt_file}: {e}")
    
    # Group zip files by skill name and find latest version
    import re
    from collections import defaultdict
    
    zip_groups = defaultdict(list)
    
    for zip_file in zip_files:
        # Extract skill name (everything before the last hyphen + commit hash)
        # Pattern: skill-name-commit-hash.zip
        match = re.match(r'^(.+)-([a-f0-9]+)$', zip_file.stem)
        if match:
            skill_name = match.group(1)
            commit_hash = match.group(2)
        else:
            # Fallback: use stem as skill name if pattern doesn't match
            skill_name = zip_file.stem
            commit_hash = None
        
        stat = zip_file.stat()
        zip_groups[skill_name].append({
            'skill_name': skill_name,
            'commit_hash': commit_hash,
            'filename': zip_file.name,
            'size': stat.st_size,
            'modified_time': stat.st_mtime,
            'modified_date': datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M:%S')
        })
    
    # Sort each group by modification time (newest first) and organize
    zip_data = []
    for skill_name, versions in zip_groups.items():
        versions.sort(key=lambda x: x['modified_time'], reverse=True)
        latest = versions[0]
        older = versions[1:] if len(versions) > 1 else []
        
        zip_data.append({
            'skill_name': skill_name,
            'latest': latest,
            'older_versions': older
        })
    
    # Sort by skill name
    zip_data.sort(key=lambda x: x['skill_name'])
    
    # Format file size
    def format_size(size_bytes):
        for unit in ['B', 'KB', 'MB']:
            if size_bytes < 1024.0:
                return f"{size_bytes:.1f} {unit}"
            size_bytes /= 1024.0
        return f"{size_bytes:.1f} GB"
    
    # Generate HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ignite - Claude Skills Collection</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 40px;
        }}
        
        h1 {{
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2em;
        }}
        
        .subtitle {{
            color: #7f8c8d;
            margin-bottom: 30px;
            font-size: 1.1em;
        }}
        
        .section {{
            margin-bottom: 40px;
        }}
        
        .section-title {{
            font-size: 1.5em;
            color: #34495e;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }}
        
        .prompt-card, .zip-card {{
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 15px;
            transition: box-shadow 0.2s;
        }}
        
        .prompt-card:hover, .zip-card:hover {{
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }}
        
        .prompt-header, .zip-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }}
        
        .prompt-name, .zip-name {{
            font-weight: 600;
            font-size: 1.1em;
            color: #2c3e50;
        }}
        
        .prompt-preview {{
            color: #6c757d;
            font-size: 0.9em;
            margin-bottom: 15px;
            font-style: italic;
        }}
        
        .btn {{
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 500;
            transition: background-color 0.2s;
            text-decoration: none;
            display: inline-block;
        }}
        
        .btn-primary {{
            background: #3498db;
            color: white;
        }}
        
        .btn-primary:hover {{
            background: #2980b9;
        }}
        
        .btn-success {{
            background: #27ae60;
            color: white;
        }}
        
        .btn-success:hover {{
            background: #229954;
        }}
        
        .btn-secondary {{
            background: #95a5a6;
            color: white;
        }}
        
        .btn-secondary:hover {{
            background: #7f8c8d;
        }}
        
        .btn-group {{
            display: flex;
            gap: 10px;
        }}
        
        .zip-meta {{
            display: flex;
            gap: 15px;
            align-items: center;
            margin-top: 5px;
            flex-wrap: wrap;
        }}
        
        .zip-size {{
            color: #7f8c8d;
            font-size: 0.9em;
        }}
        
        .zip-date {{
            color: #7f8c8d;
            font-size: 0.85em;
        }}
        
        .zip-version-badge {{
            background: #e3f2fd;
            color: #1976d2;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75em;
            font-weight: 500;
        }}
        
        .zip-older-versions {{
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e9ecef;
        }}
        
        .btn-toggle-versions {{
            background: none;
            border: none;
            color: #3498db;
            cursor: pointer;
            padding: 8px 0;
            font-size: 0.9em;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            text-align: left;
        }}
        
        .btn-toggle-versions:hover {{
            color: #2980b9;
        }}
        
        .toggle-icon {{
            font-size: 0.8em;
            transition: transform 0.2s;
        }}
        
        .toggle-icon.rotated {{
            transform: rotate(180deg);
        }}
        
        .older-versions-list {{
            margin-top: 10px;
        }}
        
        .zip-version-item {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            margin-bottom: 8px;
        }}
        
        .zip-version-info {{
            flex: 1;
        }}
        
        .zip-version-name {{
            font-size: 0.9em;
            color: #495057;
            margin-bottom: 4px;
            font-family: monospace;
        }}
        
        .zip-version-meta {{
            display: flex;
            gap: 15px;
            align-items: center;
        }}
        
        .btn-small {{
            padding: 6px 12px;
            font-size: 0.85em;
        }}
        
        .toast {{
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            display: none;
            z-index: 1000;
        }}
        
        .toast.show {{
            display: block;
            animation: slideIn 0.3s ease-out;
        }}
        
        @keyframes slideIn {{
            from {{
                transform: translateX(100%);
                opacity: 0;
            }}
            to {{
                transform: translateX(0);
                opacity: 1;
            }}
        }}
        
        .empty-state {{
            text-align: center;
            padding: 40px;
            color: #95a5a6;
        }}
        
        .footer {{
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
            text-align: center;
            color: #95a5a6;
            font-size: 0.9em;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Ignite - Claude Skills Collection</h1>
        <p class="subtitle">Prompts and downloadable skill packages for your team</p>
        
        <div class="section">
            <h2 class="section-title">📋 Prompts</h2>
"""
    
    if prompts_data:
        for idx, prompt in enumerate(prompts_data):
            # Store content in a data attribute (base64 encoded to avoid HTML issues)
            content_encoded = base64.b64encode(prompt['content'].encode('utf-8')).decode('utf-8')
            prompt_id = f"prompt-{idx}"
            html += f"""
            <div class="prompt-card">
                <div class="prompt-header">
                    <div class="prompt-name">{escape_html(prompt['name'])}</div>
                    <div class="btn-group">
                        <button class="btn btn-primary" data-prompt-id="{prompt_id}" data-prompt-content="{content_encoded}" onclick="copyPromptFromData(this)">Copy Prompt</button>
                        <a href="prompts/{prompt['filename']}" class="btn btn-secondary" target="_blank">View Markdown</a>
                    </div>
                </div>
                <div class="prompt-preview">{escape_html(prompt['preview'])}</div>
            </div>
"""
    else:
        html += """
            <div class="empty-state">
                <p>No prompts available</p>
            </div>
"""
    
    html += """
        </div>
        
        <div class="section">
            <h2 class="section-title">📦 Download Skills Zip</h2>
"""
    
    if zip_data:
        for zip_group in zip_data:
            latest = zip_group['latest']
            older = zip_group['older_versions']
            skill_name = zip_group['skill_name']
            size_str = format_size(latest['size'])
            has_older = len(older) > 0
            # Create a safe ID for the group (alphanumeric and hyphens only)
            group_id = f"zip-group-{re.sub(r'[^a-z0-9-]', '', skill_name.replace(' ', '-').lower())}"
            
            html += f"""
            <div class="zip-card">
                <div class="zip-header">
                    <div>
                        <div class="zip-name">{escape_html(skill_name)}</div>
                        <div class="zip-meta">
                            <span class="zip-size">{size_str}</span>
                            <span class="zip-date">Updated: {latest['modified_date']}</span>
                            {f'<span class="zip-version-badge">v{len(older) + 1} versions</span>' if has_older else ''}
                        </div>
                    </div>
                    <a href="{latest['filename']}" class="btn btn-success" download>Download Latest</a>
                </div>
"""
            if has_older:
                html += f"""
                <div class="zip-older-versions">
                    <button class="btn-toggle-versions" onclick="toggleOlderVersions('{group_id}')">
                        <span id="{group_id}-toggle-text">Show older versions ({len(older)})</span>
                        <span class="toggle-icon" id="{group_id}-icon">▼</span>
                    </button>
                    <div class="older-versions-list" id="{group_id}-list" style="display: none;">
"""
                for version in older:
                    version_size = format_size(version['size'])
                    html += f"""
                        <div class="zip-version-item">
                            <div class="zip-version-info">
                                <div class="zip-version-name">{escape_html(version['filename'])}</div>
                                <div class="zip-version-meta">
                                    <span class="zip-size">{version_size}</span>
                                    <span class="zip-date">Updated: {version['modified_date']}</span>
                                </div>
                            </div>
                            <a href="{version['filename']}" class="btn btn-secondary btn-small" download>Download</a>
                        </div>
"""
                html += """
                    </div>
                </div>
"""
            html += """
            </div>
"""
    else:
        html += """
            <div class="empty-state">
                <p>No zip files available</p>
            </div>
"""
    
    html += f"""
        </div>
        
        <div class="footer">
            <p>Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        </div>
    </div>
    
    <div class="toast" id="toast">Copied to clipboard!</div>
    
    <script>
        function copyPromptFromData(button) {{
            // Get content from data attribute (base64 encoded)
            const contentEncoded = button.getAttribute('data-prompt-content');
            const promptName = button.closest('.prompt-card').querySelector('.prompt-name').textContent;
            
            // Decode from base64
            const content = atob(contentEncoded);
            
            navigator.clipboard.writeText(content).then(function() {{
                showToast('Copied "' + promptName + '" to clipboard!');
            }}, function(err) {{
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = content;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {{
                    document.execCommand('copy');
                    showToast('Copied "' + promptName + '" to clipboard!');
                }} catch (err) {{
                    showToast('Failed to copy. Please use "View Markdown" instead.');
                }}
                document.body.removeChild(textarea);
            }});
        }}
        
        function showToast(message) {{
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(function() {{
                toast.classList.remove('show');
            }}, 3000);
        }}
        
        function toggleOlderVersions(groupId) {{
            const list = document.getElementById(groupId + '-list');
            const icon = document.getElementById(groupId + '-icon');
            const toggleText = document.getElementById(groupId + '-toggle-text');
            
            if (list.style.display === 'none') {{
                list.style.display = 'block';
                icon.classList.add('rotated');
                toggleText.textContent = 'Hide older versions';
            }} else {{
                list.style.display = 'none';
                icon.classList.remove('rotated');
                toggleText.textContent = 'Show older versions (' + list.children.length + ')';
            }}
        }}
    </script>
</body>
</html>
"""
    
    # Write HTML file
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(html, encoding='utf-8')
    print(f"✓ Generated HTML page: {output_file}")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 4:
        print("Usage: python generate-html.py <prompts_dir> <dist_dir> <output_file>")
        sys.exit(1)
    
    generate_html(sys.argv[1], sys.argv[2], sys.argv[3])

