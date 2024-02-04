CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer,
	`count` integer,
	`open` integer DEFAULT true,
	`poketo` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`password` text
);
