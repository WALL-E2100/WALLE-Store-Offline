"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameIdChecker from "@/components/game-id-checker";
import CustomerOrderForm from "@/components/customer-order-form";
import TopupSelector from "@/components/topup-selector";
import ModelViewer from "@/components/model-viewer";
import { Instagram, Mail } from "lucide-react";
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
          <div className="flex items-end justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              💎 WALLE Store
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-500 hover:text-white hover:bg-green-600"
                asChild
              >
                <a
                  href="https://wa.me/+919175339978"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Contact on WhatsApp"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                className="text-pink-500 hover:text-white hover:bg-gradient-to-tr from-pink-600 via-pink-500 to-purple-500"
                asChild
              >
                <a
                  // href="https://instagram.com/walle_store_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </Button> */}
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-white hover:bg-red-600"
                asChild
              >
                <a
                  href="mailto:wallerecharge@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Email us"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
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
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} WALLE Store. All rights reserved.
              Orders complete within 12 hours.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/+919175339978"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-400 transition-colors"
                title="Contact on WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="sr-only">WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/walle_store_official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <span className="text-sm text-slate-500">|</span>
              <span className="text-sm text-slate-400">+91 9175339978</span>
              <span className="text-sm text-slate-500">|</span>
              <a
                href="mailto:wallestore.official@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
                title="Email us"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">wallerecharge@gmail.com</span>
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
