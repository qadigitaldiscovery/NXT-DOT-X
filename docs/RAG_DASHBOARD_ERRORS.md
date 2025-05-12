
# RAG Dashboard Errors

## TypeScript Type Errors

The following type errors are occurring in the data access hooks:

### `src/hooks/useAlerts.ts`

1. **Error TS2589**: Type instantiation is excessively deep and possibly infinite.
   - Line: 27, Column: 19

2. **Error TS2352**: Type mismatch between Supabase returned data and Alert interface.
   - Line: 35, Column: 19
   - Details: Returned data from Supabase doesn't match the `Alert` type, missing properties: module_id, resolved, triggered_at

3. **Error TS2353**: Unknown property 'resolved' in update object.
   - Line: 51, Column: 19

### `src/hooks/useCustomerImpacts.ts`

1. **Error TS2769**: No overload matches this call - table name does not exist.
   - Line: 25, Column: 35
   - Details: The table "customer_impacts" is not recognized in the Supabase type definitions.

2. **Error TS2352**: Type conversion error for CustomerImpact[].
   - Line: 36, Column: 20
   - Details: Returned data structure doesn't match CustomerImpact interface.

### `src/hooks/useModules.ts`

1. **Error TS2769**: Table "modules" not found in Supabase type definitions.
   - Multiple instances at lines: 22, 39, 40, 56

2. **Error TS2589**: Type instantiation is excessively deep.
   - Line: 39, Column: 44

3. **Error TS2769**: No overload matches for `rag_status_logs` table.
   - Line: 47, Column: 55

4. **Error TS2769**: Unknown property 'module_id' in insert object.
   - Line: 48, Column: 9

## Root Cause

These errors are occurring because:

1. The TypeScript type definitions in `src/integrations/supabase/types.ts` file have not been updated to include the newly created tables.

2. The interfaces defined in the hook files don't align with the actual data structure from Supabase.

## Solutions

1. Update the Supabase type definitions using the `supabase gen types typescript` command.

2. Use type assertions to correctly type the responses from Supabase until the types are properly generated.

3. Ensure all interfaces match the actual table structure in the database.

4. Consider using a type safe approach with generated types from Supabase.
