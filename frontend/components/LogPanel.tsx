"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LogPanelProps {
  logs: string[];
}

export default function LogPanel({ logs }: LogPanelProps) {
  return (
    <div className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">
            Log de Requisições
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60 overflow-y-auto space-y-3 pr-2">
            {logs.length === 0 ? (
              <p className="text-slate-400 text-sm">
                Nenhuma requisição registrada ainda.
              </p>
            ) : (
              logs.map((log, idx) => {
                // Tentativa simples de separar rota e dados
                const [timeAndRoute, rawData] = log.split(": ");
                const [time, route] = timeAndRoute.split(" → ");

                return (
                  <div
                    key={idx}
                    className="border rounded-md p-2 bg-slate-50 hover:bg-slate-100 transition"
                  >
                    <p className="text-xs text-slate-500 mb-1">
                      <span className="font-mono">{time}</span> —{" "}
                      <span className="font-semibold">{route}</span>
                    </p>
                    <pre className="text-xs bg-slate-100 p-2 rounded text-slate-700 overflow-x-auto">
                      {rawData}
                    </pre>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
