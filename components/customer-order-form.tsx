"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CustomerOrderFormProps {
  selectedTopup: { name: string; price: string; diamonds: number } | null;
  verifiedUser: {
    userId: string;
    serverId: string;
    username: string;
    region: string;
  } | null;
}

export default function CustomerOrderForm({
  selectedTopup,
  verifiedUser,
}: CustomerOrderFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    game: "mobile-legends",
    userId: "",
    serverId: "",
    product: "",
    notes: "",
  });

  useEffect(() => {
    if (selectedTopup) {
      setForm((f) => ({ ...f, product: selectedTopup.name }));
      setSubmitted(false);
    }
  }, [selectedTopup]);

  // Update form when verified user info changes
  useEffect(() => {
    if (verifiedUser) {
      setForm((f) => ({
        ...f,
        userId: verifiedUser.userId,
        serverId: verifiedUser.serverId,
      }));
    }
  }, [verifiedUser]);

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.email ||
      !form.userId ||
      !form.serverId ||
      !form.product
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/submit-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Submission failed");
      }

      setSubmitted(true);
      toast({
        title: "Order Submitted!",
        description: "Your order will be processed within 12 hours.",
        className: "bg-green-900 border-green-700 text-green-100",
      });
      setForm({
        fullName: "",
        email: "",
        game: "mobile-legends",
        userId: "",
        serverId: "",
        product: "",
        notes: "",
      });

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-400 mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-white mb-2">Order Submitted!</h3>
        <p className="text-slate-300 mb-4">
          Your order will be processed and delivered within{" "}
          <span className="font-bold text-cyan-400">12 hours</span>.
        </p>
        <p className="text-sm text-slate-400">Check your email for updates.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {selectedTopup && (
        <Card className="border-cyan-400/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Selected Package</p>
              <p className="text-lg font-bold text-cyan-400">
                {selectedTopup.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-accent">
                {selectedTopup.price}
              </p>
            </div>
          </div>
        </Card>
      )}

      {!selectedTopup && (
        <div className="flex items-start gap-3 rounded-md bg-amber-900/30 border border-amber-700/50 p-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200">
            Please select a package from the available options above.
          </p>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="fullName" className="text-slate-200">
          Full Name *
        </Label>
        <Input
          id="fullName"
          placeholder="John Gamer"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          autoComplete="name"
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email" className="text-slate-200">
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="userId" className="text-slate-200">
            User ID *
          </Label>
          <Input
            id="userId"
            placeholder="e.g. 12345678"
            value={form.userId}
            onChange={(e) => update("userId", e.target.value)}
            inputMode="numeric"
            autoComplete="off"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="serverId" className="text-slate-200">
            Server ID *
          </Label>
          <Input
            id="serverId"
            placeholder="e.g. 1234"
            value={form.serverId}
            onChange={(e) => update("serverId", e.target.value)}
            inputMode="numeric"
            autoComplete="off"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes" className="text-slate-200">
          Notes (optional)
        </Label>
        <textarea
          id="notes"
          className="min-h-20 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Any special instructions"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={submitting || !selectedTopup}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold"
        >
          {submitting
            ? "Processing..."
            : `Checkout - ${selectedTopup?.price || "Select Package"}`}
        </Button>
      </div>
    </form>
  );
}
