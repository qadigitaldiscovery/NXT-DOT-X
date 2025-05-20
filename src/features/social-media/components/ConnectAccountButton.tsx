
import { PlusCircle } from "lucide-react";
import { SocialMediaPlatform } from "../api/types";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ConnectAccountButtonProps {
  onConnect: (platform: SocialMediaPlatform) => void;
}

export function ConnectAccountButton({ onConnect }: ConnectAccountButtonProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform | ''>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = () => {
    if (selectedPlatform) {
      onConnect(selectedPlatform as SocialMediaPlatform);
      setIsDialogOpen(false);
      setSelectedPlatform('');
    }
  };

  const platformOptions: { value: SocialMediaPlatform; label: string }[] = [
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'pinterest', label: 'Pinterest' },
    { value: 'youtube', label: 'YouTube' }
  ];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsDialogOpen(true);
          }}
          className="w-full h-36 flex items-center justify-center border-2 border-dashed bg-muted/50 hover:bg-muted rounded-md"
          aria-label="Connect new social media account"
        >
          <div className="flex flex-col items-center justify-center">
            <PlusCircle className="h-8 w-8 mb-2" aria-hidden="true" />
            <span className="font-medium">Connect Account</span>
          </div>
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Social Media Account</DialogTitle>
          <DialogDescription>
            Select a platform to connect your social media account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select 
              value={selectedPlatform} 
              onValueChange={(value: string) => setSelectedPlatform(value as SocialMediaPlatform)}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((platform) => (
                  <SelectItem 
                    key={platform.value} 
                    value={platform.value}
                  >
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleConnect();
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium",
              "bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4",
              !selectedPlatform && "opacity-50 pointer-events-none"
            )}
            aria-label="Connect to selected platform"
          >
            Connect Account
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
