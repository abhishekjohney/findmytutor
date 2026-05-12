"use client";

import { useState } from "react";
import { CheckCircle2, Clock, XCircle, MessageSquare, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_LEADS } from "@/lib/mock-data";
import { LeadStatus } from "@/types";

// Demo: pretend we're tutor_01
const MY_LEADS = MOCK_LEADS.filter((l) => l.tutorProfileId === "tutor_01");

// Add more mock leads for demo richness
const ALL_LEADS = [
  ...MY_LEADS,
  {
    id: "lead_demo_01",
    parentId: "user_p99",
    tutorProfileId: "tutor_01",
    message:
      "Hi, my daughter is in Grade 10 CBSE and needs help with Mathematics and Science. We are near Kalamassery. Can you start from next Monday?",
    status: LeadStatus.PENDING,
    createdAt: new Date("2025-04-20"),
    updatedAt: new Date("2025-04-20"),
  },
  {
    id: "lead_demo_02",
    parentId: "user_p88",
    tutorProfileId: "tutor_01",
    message:
      "Looking for a JEE Maths tutor for my son. He is aiming for NIT Calicut. Please let me know your fee and availability.",
    status: LeadStatus.DECLINED,
    createdAt: new Date("2025-04-18"),
    updatedAt: new Date("2025-04-19"),
  },
];

const STATUS_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: LeadStatus.PENDING, label: "Pending" },
  { value: LeadStatus.ACCEPTED, label: "Accepted" },
  { value: LeadStatus.DECLINED, label: "Declined" },
];

const STATUS_ICONS = {
  [LeadStatus.PENDING]: Clock,
  [LeadStatus.ACCEPTED]: CheckCircle2,
  [LeadStatus.DECLINED]: XCircle,
};

const STATUS_STYLES = {
  [LeadStatus.PENDING]:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  [LeadStatus.ACCEPTED]:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  [LeadStatus.DECLINED]:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function TutorLeadsPage() {
  const [filter, setFilter] = useState("ALL");
  const [leads, setLeads] = useState(ALL_LEADS);

  const filtered = leads.filter((l) =>
    filter === "ALL" ? true : l.status === filter
  );

  const updateStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date() } : l
      )
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Incoming Leads</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage parent requests for tuition sessions.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[LeadStatus.PENDING, LeadStatus.ACCEPTED, LeadStatus.DECLINED].map(
          (status) => {
            const count = leads.filter((l) => l.status === status).length;
            const Icon = STATUS_ICONS[status];
            return (
              <Card key={status} className="border-0 shadow-sm">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${STATUS_STYLES[status]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{count}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {status.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            id={`lead-filter-${opt.value.toLowerCase()}`}
            onClick={() => setFilter(opt.value)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
              filter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-primary/40"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Leads list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="font-medium">No leads found</p>
            <p className="text-sm text-muted-foreground">
              When parents contact you, their requests appear here.
            </p>
          </div>
        ) : (
          filtered.map((lead) => {
            const Icon = STATUS_ICONS[lead.status];
            return (
              <Card key={lead.id} className="border-0 shadow-md">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      P
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="font-semibold text-sm">
                            Parent Request
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lead.createdAt.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[lead.status]}`}
                        >
                          <Icon className="h-3 w-3" />
                          {lead.status}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {lead.message}
                      </p>

                      {lead.status === LeadStatus.PENDING && (
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            className="gap-1 text-xs bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              updateStatus(lead.id, LeadStatus.ACCEPTED)
                            }
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                            onClick={() =>
                              updateStatus(lead.id, LeadStatus.DECLINED)
                            }
                          >
                            <XCircle className="h-3.5 w-3.5" /> Decline
                          </Button>
                        </div>
                      )}

                      {lead.status === LeadStatus.ACCEPTED && (
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 mt-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Accepted —
                          your phone number has been shared with this parent.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
