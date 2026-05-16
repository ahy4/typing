#!/usr/bin/env python3
import json
import os

input_file = "/home/user/typing/gomi/similar_islands/island_2.json"
output_file = "/home/user/typing/gomi/similar_results/island_2.json"

# Create output directory if it doesn't exist
os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Read the input file
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Loaded {len(data)} entries from {input_file}")

delete_indices = []

# Pass 1: Find exact duplicates (jp and kana both identical)
jp_kana_map = {}
for entry in data:
    key = (entry['jp'], entry['kana'])
    if key not in jp_kana_map:
        jp_kana_map[key] = []
    jp_kana_map[key].append(entry)

print(f"Found {len(jp_kana_map)} unique (jp, kana) pairs")

exact_dups = 0
for (jp, kana), group in jp_kana_map.items():
    if len(group) > 1:
        exact_dups += 1
        # We have exact duplicates - keep 1, delete the rest
        # Prioritize deleting recent=true, keep recent=false
        recent = [e for e in group if e.get('recent', False)]
        non_recent = [e for e in group if not e.get('recent', False)]

        if non_recent:
            # Keep first non-recent, delete all others
            keep_idx = non_recent[0]['index']
            for entry in group:
                if entry['index'] != keep_idx:
                    delete_indices.append(entry['index'])
        else:
            # All recent - keep first, delete rest
            keep_idx = group[0]['index']
            for entry in group[1:]:
                delete_indices.append(entry['index'])

print(f"Found {exact_dups} groups with exact duplicates, marking {len(delete_indices)} for deletion")

# Pass 2: Find near-redundant entries (same jp, kana differs by 3 or fewer chars)
# Only consider if not already marked for deletion
remaining = [e for e in data if e['index'] not in delete_indices]

# Group remaining by jp
jp_groups = {}
for entry in remaining:
    jp = entry['jp']
    if jp not in jp_groups:
        jp_groups[jp] = []
    jp_groups[jp].append(entry)

near_dups = 0
marked_in_pass2 = 0
# Within each jp group, find near-duplicates
for jp, group in jp_groups.items():
    if len(group) <= 1:
        continue

    # Find pairs with kana diff <= 3
    checked = set()
    for i, e1 in enumerate(group):
        for j, e2 in enumerate(group):
            if i >= j:
                continue

            pair = (e1['index'], e2['index'])
            if pair in checked:
                continue
            checked.add(pair)

            kana_diff = abs(len(e1['kana']) - len(e2['kana']))
            if kana_diff <= 3:
                near_dups += 1
                # These are near-redundant
                # Decide which to delete
                # Prioritize deleting recent=true, keep recent=false
                e1_recent = e1.get('recent', False)
                e2_recent = e2.get('recent', False)

                if e1_recent and not e2_recent:
                    delete_indices.append(e1['index'])
                    marked_in_pass2 += 1
                elif e2_recent and not e1_recent:
                    delete_indices.append(e2['index'])
                    marked_in_pass2 += 1
                elif e1_recent and e2_recent:
                    # Both recent - keep longer kana (more typing value)
                    if len(e1['kana']) > len(e2['kana']):
                        delete_indices.append(e2['index'])
                    else:
                        delete_indices.append(e1['index'])
                    marked_in_pass2 += 1
                # If both non-recent, don't delete (preserve diversity)

print(f"Found {near_dups} near-duplicate pairs, marked {marked_in_pass2} additional for deletion")

# Remove duplicates and sort
delete_indices = sorted(list(set(delete_indices)))

# Ensure at least one entry remains
if len(delete_indices) >= len(data):
    delete_indices = delete_indices[:-1]

reason = "Exact duplicates and near-redundant entries (kana diff ≤3 chars) removed. Priority: delete recent=true when conflicts with recent=false."
if not delete_indices:
    reason = "内容・kana ともに十分に異なる"

result = {
    "delete": delete_indices,
    "reason": reason
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False)

print(f"\nResults:")
print(f"Total entries: {len(data)}")
print(f"Marked for deletion: {len(delete_indices)}")
print(f"Remaining: {len(data) - len(delete_indices)}")
print(f"\nOutput written to {output_file}")
print(f"\nContent:\n{json.dumps(result, ensure_ascii=False, indent=2)}")
