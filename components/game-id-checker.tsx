"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type CheckerResult = Record<string, any> | null;

interface GameIdCheckerProps {
  onVerified: (user: {
    userId: string;
    serverId: string;
    username: string;
    region: string;
  }) => void;
}

export default function GameIdChecker({ onVerified }: GameIdCheckerProps) {
  const { toast } = useToast();
  const [game] = useState("mobile-legends"); // extend later if you add more games
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckerResult>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !serverId) {
      toast({
        title: "Missing info",
        description: "Please enter both ID and Server.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      setResult(null);
      const params = new URLSearchParams({ game, userId, serverId });
      const res = await fetch(`/api/check-id?${params.toString()}`, {
        method: "GET",
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Check failed");
      }
      const data = await res.json();
      setResult(data);

      // Extract user info and notify parent component
      const payload = data?.data ?? data;
      if (payload) {
        onVerified({
          userId: payload.id,
          serverId: payload.server,
          username: payload.username ?? payload.name ?? "Unknown",
          region: payload.region ?? "",
        });
      }

      toast({
        title: "Lookup complete",
        description: "Fetched player info successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          placeholder="e.g. 12345678"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          inputMode="numeric"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="serverId">Server ID</Label>
        <Input
          id="serverId"
          placeholder="e.g. 1234"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          inputMode="numeric"
          autoComplete="off"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Name"}
        </Button>
      </div>

      {result && (
        <Card className="mt-2">
          <CardContent className="pt-6">
            {(() => {
              const payload: any = (result as any)?.data ?? result;
              const regionMap: Record<string, string> = {
                MX: "Mexico",
                US: "United States",
                BR: "Brazil",
                ID: "Indonesia",
                PH: "Philippines",
                IN: "India",
                MY: "Malaysia",
                TH: "Thailand",
                SG: "Singapore",
                VN: "Vietnam",
                // add more as needed
              };
              const username = payload?.username ?? payload?.name ?? "Unknown";
              const id = payload?.id ?? "";
              const server = payload?.server ?? "";
              const regionCode = payload?.region ?? "";
              const regionName =
                regionMap[regionCode] ?? (regionCode || "Unknown");

              return (
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Player
                      </div>
                      <div className="text-lg font-medium">{username}</div>
                    </div>
                    <Badge variant="secondary">
                      {regionName}
                      {regionCode ? ` (${regionCode})` : ""}
                    </Badge>
                  </div>

                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="rounded-md border p-3">
                      <div className="text-xs text-muted-foreground">
                        User ID
                      </div>
                      <div className="font-medium">{id || "—"}</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-xs text-muted-foreground">
                        Server
                      </div>
                      <div className="font-medium">{server || "—"}</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-xs text-muted-foreground">
                        Region
                      </div>
                      <div className="font-medium">
                        {regionName}
                        {regionCode ? ` (${regionCode})` : ""}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <h4 className="text-base font-semibold">Shop Events</h4>
                    {Array.isArray(payload?.shop_events) &&
                    payload.shop_events.length > 0 ? (
                      <div className="grid gap-3">
                        {payload.shop_events.map((evt: any, idx: number) => (
                          <div key={idx} className="rounded-md border p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="font-medium">
                                {evt?.title ?? "Event"}
                              </div>
                              {evt?.stock_display ? (
                                <Badge variant="outline">
                                  Stock: {evt.stock_display}
                                </Badge>
                              ) : null}
                            </div>
                            {Array.isArray(evt?.goods) &&
                            evt.goods.length > 0 ? (
                              <ul className="mt-2 grid gap-2">
                                {evt.goods.map((g: any, i: number) => (
                                  <li
                                    key={`${g?.sku ?? i}`}
                                    className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
                                  >
                                    <span className="text-pretty">
                                      {g?.title ?? "Item"}{" "}
                                      <span className="text-muted-foreground">
                                        {g?.reached_limit
                                          ? "(limit reached)"
                                          : ""}
                                      </span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      {g?.sku ?? ""}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="mt-2 text-sm text-muted-foreground">
                                No goods listed.
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No shop events available.
                      </div>
                    )}
                  </div>

                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm">
                      Show raw response
                    </summary>
                    <pre className="mt-2 max-h-60 overflow-auto rounded-md bg-muted p-3 text-xs">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </form>
  );
}
