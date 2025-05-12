
import { useState } from "react";
import { SocialAccountCard } from "./SocialAccountCard";
import { ConnectAccountButton } from "./ConnectAccountButton";
import { SocialAccount, SocialMediaAccount, SocialPlatform } from "../api/types";
import { mockAccounts, mockSocialAccounts } from "../api/mockData";
import { toast } from "sonner";

export function AccountsOverview() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockSocialAccounts);

  const handleConnectAccount = (platform: SocialPlatform) => {
    // In a real implementation, this would trigger an OAuth flow
    toast.success(`Starting OAuth flow for ${platform}...`);
    
    // Simulate the connected account being added after OAuth flow
    const newId = (Math.max(...accounts.map(a => parseInt(a.id))) + 1).toString();
    
    const newAccount: SocialAccount = {
      id: newId,
      platform,
      username: `yourbrand_${platform}`,
      profileImageUrl: `https://placehold.co/200x200?text=${platform.charAt(0).toUpperCase()}`,
      accountUrl: `https://${platform}.com/yourbrand_${platform}`,
      connected: true,
      lastSynced: new Date(),
      stats: {
        followers: 0,
        following: 0,
        posts: 0,
        engagement: 0
      }
    };
    
    setAccounts([...accounts, newAccount]);
    toast.success(`Connected ${platform} account successfully!`);
  };

  const handleEditAccount = (accountId: string) => {
    toast.info(`Edit account ${accountId}`);
    // In a real implementation, this would open an edit form
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    toast.success("Account removed successfully");
  };

  const handleDisconnectAccount = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, connected: false, lastSynced: null } 
        : account
    ));
    toast.success("Account disconnected successfully");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {accounts.map(account => (
          <SocialAccountCard
            key={account.id}
            account={account}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            onDisconnect={handleDisconnectAccount}
          />
        ))}
        <ConnectAccountButton onConnect={handleConnectAccount} />
      </div>
    </div>
  );
}
