"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	Mail,
	CalendarDays,
	BadgeCheck,
	ShieldCheck,
	Loader2,
	UserCircle,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
	updateProfileSchema,
	type UpdateProfileFormValues,
} from "@/features/user-profile/domain/user-profile.schemas";
import { useUpdateProfile } from "@/features/user-profile/hooks/use-update-profile";

// ══════ PROFILE PAGE ══════

export default function ProfilePage() {
	const user = useAuthStore((s) => s.user);
	const { mutate: updateProfile, isPending } = useUpdateProfile();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<UpdateProfileFormValues>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			fullName: "",
		},
	});

	const onSubmit = (data: UpdateProfileFormValues) => {
		updateProfile(data);
	};

	const formatDate = (dateStr?: string) => {
		if (!dateStr) return "N/A";
		return new Date(dateStr).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getInitial = () => {
		return user?.email?.charAt(0)?.toUpperCase() ?? "U";
	};

	return (
		<div className="space-y-6">
			{/* Profile Header Card */}
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
			>
				<Card className="overflow-hidden">
					<div className="h-24 bg-linear-to-r from-primary/20 via-primary/10 to-transparent" />
					<CardContent className="relative px-6 pb-6">
						<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
							{/* Avatar */}
							<div className="-mt-12 flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary/10 text-primary shadow-lg">
								<span className="text-2xl font-bold">{getInitial()}</span>
							</div>
							<div className="flex-1 space-y-1">
								<h2 className="text-xl font-semibold text-foreground">
									{user?.email ?? "User"}
								</h2>
								<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
									<span className="flex items-center gap-1">
										<Mail className="h-3.5 w-3.5" />
										{user?.email}
									</span>
									<span className="flex items-center gap-1">
										<CalendarDays className="h-3.5 w-3.5" />
										Joined {formatDate(user?.createdAt)}
									</span>
								</div>
							</div>
							{/* Status badges */}
							<div className="flex gap-2">
								{user?.isVerified && (
									<span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
										<BadgeCheck className="h-3 w-3" />
										Verified
									</span>
								)}
								{user?.isActive && (
									<span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600">
										<ShieldCheck className="h-3 w-3" />
										Active
									</span>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Edit Profile Form */}
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
			>
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<UserCircle className="h-5 w-5 text-primary" />
							<CardTitle className="text-lg">Personal Information</CardTitle>
						</div>
						<CardDescription>
							Update your profile details. Changes will be reflected across your
							account.
						</CardDescription>
					</CardHeader>
					<Separator />
					<CardContent className="pt-6">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
							<div className="grid gap-5 sm:grid-cols-2">
								{/* Full Name */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="fullName">Full Name</Label>
										{errors.fullName && (
											<p className="text-xs text-destructive/60 font-medium italic">
												{errors.fullName.message}
											</p>
										)}
									</div>
									<Input
										id="fullName"
										placeholder="Enter your full name"
										disabled={isPending}
										{...register("fullName")}
									/>
								</div>

								{/* Email (read-only) */}
								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										value={user?.email ?? ""}
										disabled
										className="bg-muted/50 cursor-not-allowed"
									/>
									<p className="text-xs text-muted-foreground">
										Email cannot be changed
									</p>
								</div>
							</div>

							<Separator />

							{/* Account Info Row */}
							<div className="grid gap-4 sm:grid-cols-3">
								<div className="space-y-1">
									<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Account ID
									</span>
									<p className="text-sm font-mono text-foreground truncate">
										{user?.id ?? "—"}
									</p>
								</div>
								<div className="space-y-1">
									<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Created
									</span>
									<p className="text-sm text-foreground">
										{formatDate(user?.createdAt)}
									</p>
								</div>
								<div className="space-y-1">
									<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Last Updated
									</span>
									<p className="text-sm text-foreground">
										{formatDate(user?.updatedAt)}
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex justify-end">
								<Button
									type="submit"
									disabled={isPending || !isDirty}
									className="min-w-35"
								>
									{isPending ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Saving...
										</>
									) : (
										"Save Changes"
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
