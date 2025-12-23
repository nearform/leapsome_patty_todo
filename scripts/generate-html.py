#!/usr/bin/env python3
"""
Generate HTML UI page for GitHub Pages

This script creates an index.html file that displays:
- All prompts with copy-to-clipboard functionality
- All zip files with download links
"""

import json
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
    
    # Read prompt contents
    prompts_data = []
    for prompt_file in prompt_files:
        try:
            content = prompt_file.read_text(encoding='utf-8')
            # Get a preview (first 200 chars)
            preview = content[:200].replace('\n', ' ').strip()
            if len(content) > 200:
                preview += "..."
            prompts_data.append({
                'name': prompt_file.stem,
                'filename': prompt_file.name,
                'content': content,
                'preview': preview
            })
        except Exception as e:
            print(f"Warning: Could not read {prompt_file}: {e}")
    
    # Get zip file info
    zip_data = []
    for zip_file in zip_files:
        zip_data.append({
            'name': zip_file.stem,
            'filename': zip_file.name,
            'size': zip_file.stat().st_size if zip_file.exists() else 0
        })
    
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
        
        .zip-size {{
            color: #7f8c8d;
            font-size: 0.9em;
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
        for prompt in prompts_data:
            # Escape content for JavaScript
            content_escaped = json.dumps(prompt['content'])
            html += f"""
            <div class="prompt-card">
                <div class="prompt-header">
                    <div class="prompt-name">{escape_html(prompt['name'])}</div>
                    <div class="btn-group">
                        <button class="btn btn-primary" onclick="copyPrompt({content_escaped}, '{escape_html(prompt['name'])}')">Copy Prompt</button>
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
            <h2 class="section-title">📦 Download Zip Files</h2>
"""
    
    if zip_data:
        for zip_info in zip_data:
            size_str = format_size(zip_info['size'])
            html += f"""
            <div class="zip-card">
                <div class="zip-header">
                    <div>
                        <div class="zip-name">{escape_html(zip_info['name'])}</div>
                        <div class="zip-size">{size_str}</div>
                    </div>
                    <a href="{zip_info['filename']}" class="btn btn-success" download>Download</a>
                </div>
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
        function copyPrompt(content, name) {{
            navigator.clipboard.writeText(content).then(function() {{
                showToast('Copied "' + name + '" to clipboard!');
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
                    showToast('Copied "' + name + '" to clipboard!');
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

