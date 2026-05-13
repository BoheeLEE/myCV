#!/usr/bin/env python3
"""Parse a .docx academic CV into structured JSON for website consumption."""

import argparse
import json
import re
import sys
from pathlib import Path

try:
    from docx import Document
except ImportError:
    print("Error: python-docx not installed. Run: pip install python-docx", file=sys.stderr)
    sys.exit(1)


KNOWN_SECTIONS = [
    ('summary', ['summary']),
    ('employment', ['employment']),
    ('funding_awards', ['funding and awards', 'funding & awards']),
    ('teaching', ['teaching & supervision', 'teaching and supervision', 'teaching']),
    ('service', ['academic service', 'evidence of esteem']),
    ('education', ['education']),
    ('publications', ['publications']),
    ('conferences', ['conferences']),
]


def detect_section(text: str):
    lower = text.lower().strip().rstrip(':').rstrip('.')
    # Strip parenthetical URLs like "publications (https://...)"
    lower = re.sub(r'\s*\(https?://\S+\)', '', lower).strip()
    for key, keywords in KNOWN_SECTIONS:
        for kw in keywords:
            if lower == kw or lower.startswith(kw):
                return key
    return None


def extract_url(text: str) -> str | None:
    m = re.search(r'https?://\S+', text)
    if m:
        return m.group().rstrip(')')
    return None


def clean(text: str) -> str:
    return re.sub(r'[\x00-\x08\x0b-\x1f\x7f�]', '', text).strip()


def parse_cv(docx_path: Path) -> dict:
    doc = Document(str(docx_path))

    data: dict = {
        'name': '',
        'credentials': '',
        'contact': {},
        'summary': '',
        'currentPosition': {},
        'employment': [],
        'education': [],
        'publications': [],
        'manuscriptsUnderReview': [],
        'fundingAwards': [],
        'teaching': [],
        'service': [],
        'conferences': [],
        'skills': [],
    }

    header_done = False
    current_section = None
    sections: dict = {}

    for para in doc.paragraphs:
        text = clean(para.text)
        if not text:
            continue

        style = para.style.name

        if style == 'Normal' and not header_done:
            detected = detect_section(text)
            if detected:
                header_done = True
                current_section = detected
                sections.setdefault(current_section, [])
                url = extract_url(text)
                if url and detected == 'publications':
                    data['contact']['scholar'] = url
                continue
            # Header block: name, contact
            if not data['name']:
                if ',' in text and not '@' in text and not text.startswith('http'):
                    parts = text.split(',', 1)
                    data['name'] = parts[0].strip()
                    data['credentials'] = parts[1].strip()
                else:
                    data['name'] = text
            elif '@' in text:
                data['contact']['email'] = text
            elif text.startswith('http') or 'imperial.ac.uk' in text.lower():
                data['contact']['website'] = text
            elif re.search(r'h.?index', text, re.I):
                data['contact']['hindex'] = re.sub(r'h.?index\s*', '', text, flags=re.I).strip()
            continue

        if style == 'Normal':
            detected = detect_section(text)
            if detected:
                current_section = detected
                sections.setdefault(current_section, [])
                url = extract_url(text)
                if url and detected == 'publications':
                    data['contact']['scholar'] = url
                continue

        if current_section is not None:
            sections.setdefault(current_section, []).append({
                'text': text,
                'style': style,
                'is_list': style == 'List Paragraph',
            })

    _parse_summary(data, sections)
    _parse_employment(data, sections)
    _parse_education(data, sections)
    _parse_publications(data, sections)
    _parse_funding(data, sections)
    _parse_teaching(data, sections)
    _parse_service(data, sections)
    _parse_conferences(data, sections)

    return data


def _parse_summary(data: dict, sections: dict):
    items = sections.get('summary', [])
    data['summary'] = ' '.join(
        item['text'] for item in items if item['style'] == 'Normal'
    )


def _parse_employment(data: dict, sections: dict):
    items = sections.get('employment', [])
    current_job: dict | None = None

    for item in items:
        text = item['text']
        if item['style'] == 'Normal':
            if text.startswith('Skills:'):
                skills = [s.strip() for s in text[7:].split(',') if s.strip()]
                if current_job:
                    current_job['skills'] = skills
                data['skills'] = skills
            elif text.startswith('Research:'):
                if current_job:
                    current_job['researchSummary'] = text[9:].strip()
            else:
                # New job line: "Title, Institution, Period"
                parts = [p.strip() for p in text.split(',')]
                current_job = {
                    'raw': text,
                    'title': parts[0] if parts else text,
                    'institution': parts[1] if len(parts) > 1 else '',
                    'period': ', '.join(parts[2:]) if len(parts) > 2 else '',
                    'projects': [],
                }
                data['employment'].append(current_job)
        elif item['is_list'] and current_job:
            current_job['projects'].append(text)

    if data['employment']:
        first = data['employment'][0]
        data['currentPosition'] = {
            'title': first.get('title', ''),
            'institution': first.get('institution', ''),
            'period': first.get('period', ''),
        }


def _parse_education(data: dict, sections: dict):
    items = sections.get('education', [])
    current_edu: dict | None = None

    for item in items:
        text = item['text']
        if item['is_list']:
            current_edu = {'degree': text, 'details': []}
            data['education'].append(current_edu)
        elif item['style'] == 'Normal' and current_edu:
            lower = text.lower()
            if lower.startswith('funded by'):
                current_edu['funding'] = text
            elif lower.startswith('supervisor'):
                current_edu['supervisors'] = text
            elif lower.startswith('project:'):
                current_edu['project'] = text[8:].strip()
            else:
                current_edu['details'].append(text)


def _parse_publications(data: dict, sections: dict):
    items = sections.get('publications', [])
    in_manuscripts = False

    for item in items:
        text = item['text']
        lower = text.lower()

        # Detect sub-section switches
        if 'manuscripts under review' in lower:
            in_manuscripts = True
            continue
        if 'selected peer-review' in lower or (
            'selected' in lower and 'peer' in lower
        ):
            in_manuscripts = False
            continue
        if 'scholar.google' in text or 'other' in lower and 'studies' in lower:
            url_match = re.search(r'https?://\S+', text)
            if url_match:
                data['contact']['scholar'] = url_match.group().rstrip(')')
            continue

        if item['is_list']:
            if in_manuscripts:
                data['manuscriptsUnderReview'].append(text)
            else:
                data['publications'].append(text)


def _parse_funding(data: dict, sections: dict):
    for item in sections.get('funding_awards', []):
        if item['is_list']:
            data['fundingAwards'].append(item['text'])


def _parse_teaching(data: dict, sections: dict):
    for item in sections.get('teaching', []):
        if item['is_list']:
            data['teaching'].append(item['text'])


def _parse_service(data: dict, sections: dict):
    for item in sections.get('service', []):
        data['service'].append({'text': item['text'], 'is_list': item['is_list']})


def _parse_conferences(data: dict, sections: dict):
    for item in sections.get('conferences', []):
        data['conferences'].append(item['text'])


def main():
    parser = argparse.ArgumentParser(description='Parse CV DOCX to JSON')
    parser.add_argument('--input', required=True, help='Path to .docx file')
    parser.add_argument('--output', required=True, help='Path to output JSON file')
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        print(f"Error: Input file not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Parsing {input_path} ...")
    cv_data = parse_cv(input_path)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(cv_data, f, indent=2, ensure_ascii=False)

    print(f"Written to {output_path}")
    print(f"  Name: {cv_data['name']} | {cv_data['credentials']}")
    print(f"  Current: {cv_data['currentPosition'].get('title', '')} @ {cv_data['currentPosition'].get('institution', '')}")
    print(f"  Publications: {len(cv_data['publications'])}")
    print(f"  Under review: {len(cv_data['manuscriptsUnderReview'])}")
    print(f"  Employment entries: {len(cv_data['employment'])}")
    print(f"  Education entries: {len(cv_data['education'])}")


if __name__ == '__main__':
    main()
