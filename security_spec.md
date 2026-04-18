# Firestore Security Spec

## Data Invariants
1. Users can only read and write their own profile in `/users/{uid}`.
2. Users can only write their own saved axioms in `/saved_axioms/{axiomId}`.
3. Users can only read their own saved axioms in `/saved_axioms/{axiomId}`.
4. Triangulation logs can be created by anyone (for system history) but only read by authenticated users.
5. Global index (rankings) can be updated by anyone (for aggregate learning) and read by anyone.
6. Community votes can be read by anyone and written only by authenticated users.
7. All IDs must be valid strings.
8. All write operations must include standard validation.

## The "Dirty Dozen" Payloads (Attack Vectors)
1. **Identity Spoofing**: Attempt to create a `saved_axiom` with another user's `uid`.
2. **State Shortcutting**: Attempt to update `rank` in `global_index` by 1,000,000 instead of `increment(1)`.
3. **Resource Poisoning**: Inject a 2MB string into `concept` field.
4. **Metadata Hijacking**: Attempt to set `createdAt` to a date in the past.
5. **PII Leak**: Attempt to list all `users` as a guest.
6. **Orphaned Writes**: Create a `saved_axiom` that doesn't belong to any user.
7. **Recursive Cost Attack**: Query `triangulation_logs` without a limit.
8. **Shadow Keys**: Add secret fields to a `User` profile.
9. **Role Escalation**: Attempt to set `admin: true` in user profile.
10. **ID Poisoning**: Use `/path/../anotherPath` as a document ID.
11. **Type Mismatch**: Send a `list` where a `map` is expected.
12. **Null Bypass**: Send `null` for a required field.

## Secure Rule Strategy
1. Split `read` into `get` and `list`.
2. Use `resource.data` guards for all `list` operations.
3. Implement `isValid[Entity]` helpers for all writes.
4. Enforce strict size limits on all strings.
5. Use `isOwner(uid)` as the primary gate.

