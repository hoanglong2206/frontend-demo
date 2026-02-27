const Loading = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
			<div className="relative h-12 w-12">
				<div className="absolute inset-0 rounded-full border-4 border-muted" />
				<div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
			<p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
		</div>
	);
};

export default Loading;
