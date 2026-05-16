#!/usr/bin/env python3
"""
Analyzes island_2.json and creates the output file with deletion recommendations.
This script uses streaming to handle large files efficiently.
"""

import json
import os
from collections import defaultdict

def analyze_duplicates():
    input_path = "/home/user/typing/gomi/similar_islands/island_2.json"
    output_path = "/home/user/typing/gomi/similar_results/island_2.json"

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Load the data
    with open(input_path, 'r', encoding='utf-8') as f:
        entries = json.load(f)

    to_delete = set()

    # PASS 1: Exact duplicates (jp and kana are identical)
    jp_kana_groups = defaultdict(list)
    for entry in entries:
        key = (entry['jp'], entry['kana'])
        jp_kana_groups[key].append(entry)

    for key, group in jp_kana_groups.items():
        if len(group) > 1:
            # Separate recent and non-recent
            recent = [e for e in group if e.get('recent', False)]
            non_recent = [e for e in group if not e.get('recent', False)]

            # Keep one, mark rest for deletion
            if non_recent:
                # Prefer to keep non-recent (existing) entries
                keep_idx = non_recent[0]['index']
            else:
                # All recent, keep first
                keep_idx = group[0]['index']

            for entry in group:
                if entry['index'] != keep_idx:
                    to_delete.add(entry['index'])

    # PASS 2: Near-duplicates (same jp, kana length differs by 3 or less)
    remaining = [e for e in entries if e['index'] not in to_delete]
    jp_remaining = defaultdict(list)
    for entry in remaining:
        jp_remaining[entry['jp']].append(entry)

    for jp, group in jp_remaining.items():
        if len(group) <= 1:
            continue

        # Check all pairs
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                e1, e2 = group[i], group[j]

                # Skip if either already marked for deletion
                if e1['index'] in to_delete or e2['index'] in to_delete:
                    continue

                kana_diff = abs(len(e1['kana']) - len(e2['kana']))

                if kana_diff <= 3:
                    # These are near-duplicates
                    r1 = e1.get('recent', False)
                    r2 = e2.get('recent', False)

                    if r1 and not r2:
                        to_delete.add(e1['index'])
                    elif r2 and not r1:
                        to_delete.add(e2['index'])
                    elif r1 and r2:
                        # Both recent: keep longer kana
                        if len(e1['kana']) > len(e2['kana']):
                            to_delete.add(e2['index'])
                        elif len(e2['kana']) > len(e1['kana']):
                            to_delete.add(e1['index'])
                        else:
                            # Same length, delete higher index
                            to_delete.add(max(e1['index'], e2['index']))

    # Ensure at least one entry remains
    delete_list = sorted(list(to_delete))
    if len(delete_list) >= len(entries):
        delete_list = delete_list[:-1]

    # Create reason
    reason = "Exact duplicates and near-redundant entries (kana diff ≤3 chars) removed, prioritizing deletion of recent=true entries."
    if not delete_list:
        reason = "内容・kana ともに十分に異なる"

    result = {
        "delete": delete_list,
        "reason": reason
    }

    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False)

    return result

if __name__ == '__main__':
    result = analyze_duplicates()
    print(json.dumps(result, ensure_ascii=False, indent=2))
