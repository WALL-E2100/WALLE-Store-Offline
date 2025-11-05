"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GameIdChecker from "@/components/game-id-checker";
import CustomerOrderForm from "@/components/customer-order-form";
import TopupSelector from "@/components/topup-selector";
import ModelViewer from "@/components/model-viewer";
import { useState } from "react";

type VerifiedUser = {
  userId: string;
  serverId: string;
  username: string;
  region: string;
} | null;

export default function Page() {
  const [selectedTopup, setSelectedTopup] = useState<{
    name: string;
    price: string;
    diamonds: number;
  } | null>(null);
  const [verifiedUser, setVerifiedUser] = useState<VerifiedUser>(null);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-background to-slate-950">
      <header className="border-b border-border bg-black from-slate-900 to-slate-800 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-end gap-3 mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              💎 WALLE Store
            </h1>
          </div>
          <p className="text-base text-slate-300 max-w-2xl">
            Premium gaming top-ups & diamonds. Verify your Game ID and grab
            exclusive passes & diamond packs.
          </p>
        </div>
      </header>

      {/* Single, transparent 3D model that blends into the page */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-96 rounded-lg overflow-visible">
          <ModelViewer
            modelPath="/guinevere-lotus-lobby.glb"
            modelName="gusion"
            heroName="Guinevere - Lotus Lobby"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 border-b border-border">
        <h2 className="text-2xl font-bold text-white mb-6">
          Select Your Package
        </h2>
        <TopupSelector
          selectedTopup={selectedTopup}
          onSelect={setSelectedTopup}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 grid gap-8 lg:grid-cols-2">
        <Card className="border-secondary/50 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-cyan-400">Game ID Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <GameIdChecker onVerified={(user) => setVerifiedUser(user)} />
          </CardContent>
        </Card>

        <Card
          className="border-secondary/50 bg-slate-900/50 backdrop-blur"
          id="order"
        >
          <CardHeader>
            <CardTitle className="text-cyan-400">Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerOrderForm
              selectedTopup={selectedTopup}
              verifiedUser={verifiedUser}
            />
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border bg-slate-900/50 mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} WALLE Store. All rights reserved.
            Orders complete within 12 hours.
          </p>
        </div>
      </footer>
    </main>
  );
}
