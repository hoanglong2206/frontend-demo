"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/shared/lib/utils";
import {
	CheckCircle,
	Info,
	Loader2,
	XCircle,
	TriangleAlert,
} from "lucide-react";
import { getToasts, subscribeToToasts } from "@/shared/hooks/use-toast";

export function ToasterContainer() {
	const toasts = useSyncExternalStore(subscribeToToasts, getToasts, getToasts);

	if (toasts.length === 0) return null;

	return (
		<div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none sm:max-w-sm w-[calc(100vw-2rem)] select-none">
			{toasts.map((item) => (
				<div
					key={item.id}
					className={cn(
						"pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border bg-white text-slate-800 animate-in slide-in-from-right-full duration-300",
						item.type === "default" && "border-slate-200",
						item.type === "success" && "border-l-4 border-l-green-500",
						item.type === "error" && "border-l-4 border-l-red-500",
						item.type === "warning" && "border-l-4 border-l-amber-500",
						item.type === "info" && "border-l-4 border-l-blue-500",
						item.type === "loading" && "border-l-4 border-l-slate-500",
					)}
				>
					{item.type === "default" && (
						<Info className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
					)}
					{item.type === "success" && (
						<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
					)}
					{item.type === "error" && (
						<XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
					)}
					{item.type === "warning" && (
						<TriangleAlert className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
					)}
					{item.type === "info" && (
						<Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
					)}
					{item.type === "loading" && (
						<Loader2 className="w-5 h-5 text-slate-500 mt-0.5 shrink-0 animate-spin" />
					)}

					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm wrap-break-word">
							{item.message}
						</p>
						{item.description && (
							<p className="text-xs text-slate-500 mt-1 wrap-break-word">
								{item.description}
							</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export const ToastContainer = ToasterContainer;
