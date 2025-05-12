
import { useState } from "react";
import { SocialAccountCard } from "./SocialAccountCard";
import { ConnectAccountButton } from "./ConnectAccountButton";
import { SocialMediaAccount, SocialMediaPlatform } from "../api/types";
import { mockSocialAccounts } from "../api/mockData";
import { toast } from "sonner";

export function AccountsOverview() {
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>(mockSocialAccounts);

  const handleConnectAccount = (platform: SocialMediaPlatform) => {
    // In a real implementation, this would trigger an OAuth flow
    toast.success(`Starting OAuth flow for ${platform}...`);
    
    // Simulate the connected account being added after OAuth flow
    const newId = (Math.max(...accounts.map(a => parseInt(a.id))) + 1).toString();
    
    const platformUsernames: Record<SocialMediaPlatform, string> = {
      twitter: 'new_twitter_handle',
      facebook: 'New.Facebook.Page',
      instagram: 'new.instagram',
      linkedin: 'new-linkedin-company',
      tiktok: 'newtiktok',
      pinterest: 'new_pinterest',
      youtube: 'NewYouTubeChannel'
    };
    
    const newAccount: SocialMediaAccount = {
      id: newId,
      platform,
      username: platformUsernames[platform],
      profileUrl: `https://${platform}.com/${platformUsernames[platform]}`,
      isConnected: true,
      lastSyncedAt: new Date().toISOString(),
      metrics: {
        followers: 0
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
        ? { ...account, isConnected: false, lastSyncedAt: undefined } 
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
