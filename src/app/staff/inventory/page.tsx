"use client";
import { useState } from "react";
import { INVENTORY, formatCurrency } from "@/lib/mock-data";

export default function StaffInventory() {
  const [items, setItems] = useState(INVENTORY);
  const [search, setSearch] = useState("");
  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="font-headline-md text-headline-md text-primary mb-6">Kho vật tư</h1>

      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: 20 }}>search</span>
        <input
          className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-xl bg-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Tìm kiếm vật tư..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const pct = Math.round((item.quantity / item.maxStock) * 100);
          const isLow = item.quantity <= item.minThreshold;
          return (
            <div key={item.id} className={`bg-white rounded-2xl p-5 border-2 transition-all ${isLow ? "border-error/40" : "border-outline-variant/20"}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">{item.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{item.category} · {item.unit}</p>
                </div>
                {isLow && (
                  <span className="bg-error-container text-error text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>warning</span>
                    Sắp hết
                  </span>
                )}
              </div>

              <div className="flex items-end justify-between mb-2">
                <span className={`font-headline-sm text-2xl font-bold ${isLow ? "text-error" : "text-on-surface"}`}>{item.quantity}</span>
                <span className="text-on-surface-variant text-sm">/ {item.maxStock} {item.unit}</span>
              </div>

              <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${isLow ? "bg-error" : pct > 60 ? "bg-primary" : "bg-secondary"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <p className="text-xs text-on-surface-variant">Ngưỡng tối thiểu: {item.minThreshold} {item.unit}</p>
              <p className="text-xs text-on-surface-variant">Nhập kho lần cuối: {item.lastRestocked}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
