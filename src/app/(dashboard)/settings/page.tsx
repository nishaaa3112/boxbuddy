import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { User, Building2, Bell, ShieldAlert } from "lucide-react";

function SettingsCard({
  icon: Icon,
  iconGradient,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconGradient: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0" style={{ background: iconGradient }}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-[14px] font-bold text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-500">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Settings"
        description="Manage your account and organization preferences"
        tag="Account"
      />

      {/* Profile */}
      <SettingsCard
        icon={User}
        iconGradient="linear-gradient(135deg,#0F2342,#1a4a8a)"
        title="Profile"
        description="Update your personal information"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Full Name</Label>
              <Input
                defaultValue="Neelu Suthar"
                className="h-10 rounded-xl border-slate-200 bg-slate-50 text-[13px] focus-visible:ring-emerald-500/40 focus-visible:border-emerald-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Email</Label>
              <Input
                defaultValue="neelusuthar2003@gmail.com"
                type="email"
                className="h-10 rounded-xl border-slate-200 bg-slate-50 text-[13px] focus-visible:ring-emerald-500/40 focus-visible:border-emerald-400"
              />
            </div>
          </div>
          <Button
            className="h-9 text-white text-xs rounded-xl gap-2 shadow-sm"
            style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
          >
            Save Changes
          </Button>
        </div>
      </SettingsCard>

      {/* Organization */}
      <SettingsCard
        icon={Building2}
        iconGradient="linear-gradient(135deg,#7c3aed,#8b5cf6)"
        title="Organization"
        description="Company and operational preferences"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Company Name</Label>
              <Input
                defaultValue="BoxBuddy Logistics"
                className="h-10 rounded-xl border-slate-200 bg-slate-50 text-[13px] focus-visible:ring-emerald-500/40 focus-visible:border-emerald-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Default Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-[13px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                  <SelectItem value="INR">INR — Indian Rupee</SelectItem>
                  <SelectItem value="GBP">GBP — British Pound</SelectItem>
                  <SelectItem value="AED">AED — UAE Dirham</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="h-9 text-white text-xs rounded-xl shadow-sm"
            style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
          >
            Save Changes
          </Button>
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard
        icon={Bell}
        iconGradient="linear-gradient(135deg,#d97706,#f59e0b)"
        title="Notifications"
        description="Configure alerts and notification preferences"
      >
        <div className="space-y-1">
          {[
            { label: "High Risk Alerts",         description: "Get notified when AI flags a shipment as high risk",   defaultChecked: true  },
            { label: "Shipment Status Updates",  description: "Notifications on status changes",                      defaultChecked: true  },
            { label: "Document Expiry Warnings", description: "Alert when documents are about to expire",             defaultChecked: true  },
            { label: "Delay Predictions",        description: "AI-predicted delay notifications",                     defaultChecked: false },
            { label: "Weekly Reports",           description: "Receive weekly analytics digest via email",            defaultChecked: false },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #f8fafc" : "none" }}
            >
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{item.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Danger Zone */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(239,68,68,0.2)", boxShadow: "0 1px 3px rgba(239,68,68,0.05)" }}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-red-100/60" style={{ background: "linear-gradient(135deg,#fff5f5,#fff8f8)" }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0" style={{ background: "linear-gradient(135deg,#dc2626,#ef4444)" }}>
            <ShieldAlert className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-red-700">Danger Zone</h3>
            <p className="text-[11px] text-red-400">Irreversible account actions</p>
          </div>
        </div>
        <div className="px-6 py-5 bg-white">
          <div className="flex items-center justify-between rounded-xl p-4" style={{ background: "#fff5f5", border: "1px solid rgba(239,68,68,0.15)" }}>
            <div>
              <p className="text-[13px] font-semibold text-slate-800">Delete Account</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm" className="rounded-xl text-xs">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
