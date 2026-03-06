export default function CampaignsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-dark">Campaigns & Card Builder</h2>
      </div>
      <div className="bg-white border border-border rounded-xl shadow-sm p-8 text-center text-muted-foreground flex-1 flex items-center justify-center flex-col gap-4">
        <p>Card Builder will appear here. It will include settings to modify colors, stamps count, and rewards.</p>
        <p className="text-xs">In a later milestone, this will hook up with `lib/wallet/apple.ts` to actually generate `.pkpass` files.</p>
      </div>
    </div>
  );
}
