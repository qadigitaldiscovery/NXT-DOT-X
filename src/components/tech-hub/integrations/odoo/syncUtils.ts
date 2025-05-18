
import { toast } from "sonner";

// Utility functions for sync operations
export const handleToggleSync = async (
  id: string,
  isEnabled: boolean,
  updateSetting: (id: string, data: any) => Promise<any>
) => {
  try {
    const result = await updateSetting(id, { is_enabled: isEnabled });
    
    if (result.success) {
      toast.success(`Sync ${isEnabled ? 'enabled' : 'disabled'}`, {
        description: `${isEnabled ? 'Enabled' : 'Disabled'} sync for this data type.`
      });
      return true;
    } else {
      toast.error("Update failed", {
        description: result.message || "Could not update sync setting"
      });
      return false;
    }
  } catch (error) {
    toast.error("Update failed", {
      description: "An error occurred while updating the sync setting"
    });
    return false;
  }
};

export const handleFrequencyChange = async (
  id: string,
  frequency: string,
  updateSetting: (id: string, data: any) => Promise<any>
) => {
  try {
    const result = await updateSetting(id, { sync_frequency: frequency });
    
    if (result.success) {
      toast.success("Frequency updated", {
        description: `Updated sync frequency to ${frequency}`
      });
      return true;
    } else {
      toast.error("Update failed", {
        description: result.message || "Could not update sync frequency"
      });
      return false;
    }
  } catch (error) {
    toast.error("Update failed", {
      description: "An error occurred while updating the sync frequency"
    });
    return false;
  }
};

export const handleManualSync = async (
  id: string,
  triggerSync: (id: string) => Promise<any>
) => {
  try {
    const result = await triggerSync(id);
    
    if (result.success) {
      toast.success("Sync initiated", {
        description: "Manual sync has been initiated"
      });
      return true;
    } else {
      toast.error("Sync failed", {
        description: result.message || "Could not initiate manual sync"
      });
      return false;
    }
  } catch (error) {
    toast.error("Sync failed", {
      description: "An error occurred while initiating manual sync"
    });
    return false;
  }
};
