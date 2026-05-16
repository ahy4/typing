#!/usr/bin/env python3
"""
Process island_2.json to identify and mark redundant entries for deletion.

Criteria for deletion:
1. Exact duplicates (jp and kana identical) - keep 1, prioritize deleting recent=true
2. Near-duplicates (same jp, kana differs by ≤3 chars) - prioritize deleting recent=true
3. Never delete all entries in a group
"""

import json
import os
import sys

def main():
    input_file = "/home/user/typing/gomi/similar_islands/island_2.json"
    output_file = "/home/user/typing/gomi/similar_results/island_2.json"

    # Create output directory
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    # Read input
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Processing {len(data)} entries...", file=sys.stderr)

    to_delete = set()

    # ===== PASS 1: Exact duplicates =====
    jp_kana_map = {}
    for entry in data:
        key = (entry['jp'], entry['kana'])
        if key not in jp_kana_map:
            jp_kana_map[key] = []
        jp_kana_map[key].append(entry)

    exact_dup_groups = 0
    for (jp, kana), group in jp_kana_map.items():
        if len(group) > 1:
            exact_dup_groups += 1
            # Separate by recent flag
            recent_entries = [e for e in group if e.get('recent', False)]
            non_recent_entries = [e for e in group if not e.get('recent', False)]

            if non_recent_entries:
                # Keep first non-recent, delete everything else
                keep_entry = non_recent_entries[0]
                for entry in group:
                    if entry['index'] != keep_entry['index']:
                        to_delete.add(entry['index'])
            else:
                # All are recent - keep first, delete rest
                keep_entry = group[0]
                for entry in group[1:]:
                    to_delete.add(entry['index'])

    print(f"  Pass 1: Found {exact_dup_groups} exact duplicate groups, marking {len(to_delete)} for deletion", file=sys.stderr)

    # ===== PASS 2: Near-duplicates (same jp, kana diff <= 3) =====
    remaining = [e for e in data if e['index'] not in to_delete]

    # Group remaining by jp
    jp_groups = {}
    for entry in remaining:
        jp = entry['jp']
        if jp not in jp_groups:
            jp_groups[jp] = []
        jp_groups[jp].append(entry)

    marked_in_pass2 = 0
    for jp, group in jp_groups.items():
        if len(group) <= 1:
            continue

        # Check all pairs in this group
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                e1, e2 = group[i], group[j]

                # Skip if either already marked for deletion
                if e1['index'] in to_delete or e2['index'] in to_delete:
                    continue

                kana_diff = abs(len(e1['kana']) - len(e2['kana']))
                if kana_diff <= 3:
                    # Found near-duplicate pair
                    e1_recent = e1.get('recent', False)
                    e2_recent = e2.get('recent', False)

                    # Decide which to delete
                    if e1_recent and not e2_recent:
                        # Delete recent, keep non-recent
                        to_delete.add(e1['index'])
                        marked_in_pass2 += 1
                    elif e2_recent and not e1_recent:
                        # Delete recent, keep non-recent
                        to_delete.add(e2['index'])
                        marked_in_pass2 += 1
                    elif e1_recent and e2_recent:
                        # Both recent - keep longer kana (more typing value)
                        if len(e1['kana']) > len(e2['kana']):
                            to_delete.add(e2['index'])
                        elif len(e2['kana']) > len(e1['kana']):
                            to_delete.add(e1['index'])
                        else:
                            # Same length - keep lower index
                            to_delete.add(max(e1['index'], e2['index']))
                        marked_in_pass2 += 1
                    # If both non-recent, don't delete (preserve diversity)

    print(f"  Pass 2: Marked {marked_in_pass2} additional for deletion in near-duplicate check", file=sys.stderr)

    # Ensure at least one entry survives
    delete_list = sorted(list(to_delete))
    if len(delete_list) >= len(data):
        delete_list = delete_list[:-1]

    # Determine reason
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

    print(f"\nResults:", file=sys.stderr)
    print(f"  Total entries: {len(data)}", file=sys.stderr)
    print(f"  Marked for deletion: {len(delete_list)}", file=sys.stderr)
    print(f"  Remaining: {len(data) - len(delete_list)}", file=sys.stderr)
    print(f"\nOutput written to {output_file}", file=sys.stderr)

if __name__ == '__main__':
    main()
