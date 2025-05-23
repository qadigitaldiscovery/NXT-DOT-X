
// This file re-exports all the refactored hooks for backward compatibility
import { 
  Supplier,
  useSuppliers,
  useSupplier,
  useCreateSupplier,
  useBulkCreateSuppliers,
  useUpdateSupplier,
  useDeleteSupplier
} from './suppliers';

export type { Supplier };

export {
  useSuppliers,
  useSupplier,
  useCreateSupplier,
  useBulkCreateSuppliers,
  useUpdateSupplier,
  useDeleteSupplier
};
