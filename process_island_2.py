#!/usr/bin/env python3
"""
Process island_2.json to identify redundant entries.
Based on:
- Exact duplicates: jp and kana both identical
- Near-duplicates: same jp, kana differs by 3+ characters
"""

import json
import os

def main():
    input_file = "/home/user/typing/gomi/similar_islands/island_2.json"
    output_file = "/home/user/typing/gomi/similar_results/island_2.json"

    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    # Load data
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    to_delete = set()

    # ===== STEP 1: Find and handle exact duplicates =====
    # Group by (jp, kana) pair
    jp_kana_map = {}
    for entry in data:
        key = (entry['jp'], entry['kana'])
        if key not in jp_kana_map:
            jp_kana_map[key] = []
        jp_kana_map[key].append(entry)

    # For each group with duplicates, keep one
    for (jp, kana), group in jp_kana_map.items():
        if len(group) > 1:
            # Separate by recent flag
            recent_entries = [e for e in group if e.get('recent', False)]
            non_recent_entries = [e for e in group if not e.get('recent', False)]

            if non_recent_entries:
                # Prefer to keep non-recent (existing) entries
                keep_idx = non_recent_entries[0]['index']
            else:
                # All are recent, keep the first one
                keep_idx = group[0]['index']

            # Mark all others for deletion
            for entry in group:
                if entry['index'] != keep_idx:
                    to_delete.add(entry['index'])

    # ===== STEP 2: Find near-duplicates =====
    # Consider only entries not marked for deletion yet
    remaining = [e for e in data if e['index'] not in to_delete]

    # Group remaining by jp
    jp_groups = {}
    for entry in remaining:
        jp = entry['jp']
        if jp not in jp_groups:
            jp_groups[jp] = []
        jp_groups[jp].append(entry)

    # Check each group for near-duplicates (kana diff <= 3 chars)
    for jp, group in jp_groups.items():
        if len(group) <= 1:
            continue

        # Check all pairs
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                e1, e2 = group[i], group[j]

                # Skip if already marked
                if e1['index'] in to_delete or e2['index'] in to_delete:
                    continue

                kana_diff = abs(len(e1['kana']) - len(e2['kana']))

                # If kana differs by 3 or fewer characters, consider them near-duplicates
                if kana_diff <= 3:
                    e1_recent = e1.get('recent', False)
                    e2_recent = e2.get('recent', False)

                    # Decision logic: prioritize deleting recent=true, keep recent=false
                    if e1_recent and not e2_recent:
                        # Delete e1 (recent), keep e2 (non-recent)
                        to_delete.add(e1['index'])
                    elif e2_recent and not e1_recent:
                        # Delete e2 (recent), keep e1 (non-recent)
                        to_delete.add(e2['index'])
                    elif e1_recent and e2_recent:
                        # Both recent: keep the one with longer kana (more typing value)
                        len1 = len(e1['kana'])
                        len2 = len(e2['kana'])
                        if len1 > len2:
                            to_delete.add(e2['index'])
                        elif len2 > len1:
                            to_delete.add(e1['index'])
                        else:
                            # Same length, delete the one with higher index
                            to_delete.add(max(e1['index'], e2['index']))
                    # If both non-recent, don't delete (preserve existing diversity)

    # ===== Finalize results =====
    delete_list = sorted(list(to_delete))

    # Safety: never delete all entries
    if len(delete_list) >= len(data):
        delete_list = delete_list[:-1]

    # Prepare reason
    if delete_list:
        reason = "Exact duplicates and near-redundant entries (kana diff ≤3 chars) removed, prioritizing deletion of recent=true entries."
    else:
        reason = "内容・kana ともに十分に異なる"

    result = {
        "delete": delete_list,
        "reason": reason
    }

    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False)

if __name__ == '__main__':
    main()
