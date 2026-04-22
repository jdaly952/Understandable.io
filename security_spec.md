# Security Specification - Understandable.io

## 1. Data Invariants
- **User Profiles**: Only the owner can read or write their own profile.
- **Saved Topics**: Must belong to a user. Only the owner can list, read, or delete.
- **Synthesis Logs**: Public history of generations. Immutable once created. Access is public but can be restricted by a "visibility" flag.
- **Global Index**: Publicly readable. Updated by the system during synthesis to track popularity.
- **Community Votes**: Publicly readable. Anyone can create/update (increment/decrement).

## 2. The "Dirty Dozen" Payloads

### Identity Spoofing
1. **Target**: `saved_topics` 
   **Payload**: `{"uid": "someone_else_id", "concept": "Stealing Data", ...}`
   **Action**: Create
   **Expectation**: PERMISSION_DENIED (UID must match auth)

2. **Target**: `users/target_id`
   **Payload**: `{"displayName": "Hacker", ...}`
   **Action**: Update
   **Expectation**: PERMISSION_DENIED (Must be owner)

### State Shortcutting / Ghost Fields
3. **Target**: `saved_topics`
   **Payload**: `{"concept": "Math", "isVerified": true, "uid": "my_id", ...}`
   **Action**: Create
   **Expectation**: PERMISSION_DENIED (isVerified is not in schema)

4. **Target**: `saved_topics`
   **Payload**: `{"uid": "my_id", ...}` (Missing required fields like `payload`)
   **Action**: Create
   **Expectation**: PERMISSION_DENIED (Schema mismatch)

### Resource Poisoning (Denial of Wallet)
5. **Target**: `saved_topics`
   **Payload**: `{"concept": "A" * 1000000, ...}`
   **Action**: Create
   **Expectation**: PERMISSION_DENIED (Size limits)

6. **Target**: `saved_topics`
   **Payload**: `{"concept": "Valid", "payload": {"data": "junk" * 1000}, ...}`
   **Action**: Create
   **Expectation**: PERMISSION_DENIED (Deep size limits on map)

### Relational / Orphan writes
7. **Target**: `saved_topics`
   **Payload**: `{"uid": "my_id", "concept": "test", "payload": {}, "createdAt": "2020-01-01"}`
   **Action**: Create
   **Expectation**: PERMISSION_DENIED (createdAt must be request.time)

### Query Scraping
8. **Target**: `saved_topics`
   **Query**: `getDocs(collection("saved_topics"))` (Blanket query)
   **Action**: List
   **Expectation**: PERMISSION_DENIED (Rule must enforce uid boundary)

9. **Target**: `synthesis_logs`
   **Query**: `getDocs(collection("synthesis_logs"))`
   **Action**: List
   **Expectation**: ALLOW (Public index)

### PII Leaks
10. **Target**: `users/somebody`
    **Action**: Get
    **Expectation**: PERMISSION_DENIED (Email/PII isolation)

### Terminal State Access
11. **Target**: `saved_topics/{id}`
    **Payload**: `{"concept": "Changed it"}`
    **Action**: Update
    **Expectation**: PERMISSION_DENIED (Topics should be immutable or strictly owner-only with invariant checks)

### ID Poisoning
12. **Target**: `saved_topics/../../some_system_path`
    **Action**: Get
    **Expectation**: PERMISSION_DENIED (isValidId enforcement)

## 3. Test Runner (Conceptual)
All tests verify that the above malicious payloads result in PERMISSION_DENIED.
