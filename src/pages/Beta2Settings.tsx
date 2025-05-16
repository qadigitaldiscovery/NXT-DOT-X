import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { CollapsibleSettingsSection } from '@/components/beta2/settings/CollapsibleSettingsSection';

const Beta2Settings = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = React.useState(false);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success('Program settings saved successfully');
    }, 800);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loyalty Program Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-6">
          Configure your loyalty program settings and preferences.
        </p>
        
        <div className="space-y-8">
          {/* Program Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Program Details</h2>
            <div className="border rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                  defaultValue="Premier Rewards"
                  aria-label="Program Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                  rows={3}
                  defaultValue="Our loyalty program rewards members with points for purchases that can be redeemed for exclusive benefits."
                  aria-label="Program Description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points Currency Name</label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                    defaultValue="Reward Points"
                    aria-label="Points Currency Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Earning Ratio ($ to points)</label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                    defaultValue="1:1"
                    aria-label="Earning Ratio"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Tier Levels */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Tier Levels</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1"
                        defaultValue="Bronze"
                        aria-label="Bronze Tier Name"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-24"
                        defaultValue="0"
                        aria-label="Bronze Required Points"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-full"
                        defaultValue="Basic rewards access"
                        aria-label="Bronze Tier Benefits"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-red-600 hover:text-red-800 text-sm mr-2">Delete</button>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1"
                        defaultValue="Silver"
                        aria-label="Silver Tier Name"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-24"
                        defaultValue="1000"
                        aria-label="Silver Required Points"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-full"
                        defaultValue="Free shipping, Birthday gift"
                        aria-label="Silver Tier Benefits"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-red-600 hover:text-red-800 text-sm mr-2">Delete</button>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1"
                        defaultValue="Gold"
                        aria-label="Gold Tier Name"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-24"
                        defaultValue="5000"
                        aria-label="Gold Required Points"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-full"
                        defaultValue="Silver benefits + Early access, Exclusive rewards"
                        aria-label="Gold Tier Benefits"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-red-600 hover:text-red-800 text-sm mr-2">Delete</button>
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={4} className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Tier Level
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Program Rules */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Program Rules</h2>
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h3 className="font-medium">Point Expiration</h3>
                  <p className="text-sm text-gray-500">Set how long points remain valid</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border-gray-300 rounded-md shadow-sm px-3 py-1 w-16"
                    defaultValue="12"
                    aria-label="Point Expiration Value"
                  />
                  <select
                    className="border-gray-300 rounded-md shadow-sm px-3 py-1"
                    aria-label="Point Expiration Unit"
                  >
                    <option>Months</option>
                    <option>Years</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h3 className="font-medium">Points Rounding</h3>
                  <p className="text-sm text-gray-500">How to round partial points</p>
                </div>
                <select
                  className="border-gray-300 rounded-md shadow-sm px-3 py-1"
                  aria-label="Points Rounding Method"
                >
                  <option>Round up</option>
                  <option>Round down</option>
                  <option>Round to nearest</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium">Point Cancelation</h3>
                  <p className="text-sm text-gray-500">When returns occur</p>
                </div>
                <select
                  className="border-gray-300 rounded-md shadow-sm px-3 py-1"
                  aria-label="Point Cancelation Policy"
                >
                  <option>Deduct points</option>
                  <option>Maintain points</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta2Settings;
