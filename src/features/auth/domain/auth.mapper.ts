import type { Session, User } from "./auth.types";
import type { SessionDTO, UserDTO } from "../api/auth.api.type";

export function mapUserDTO(dto: UserDTO): User {
	return {
		id: dto.id,
		fullName: dto.full_name,
		email: dto.email,
		avatarUrl: dto.avatar_url,
		gender: dto.gender,
		dateOfBirth: dto.date_of_birth,
		isVerified: dto.is_verified,
		createdAt: dto.created_at,
		updatedAt: dto.updated_at,
	};
}

export function mapSessionDTO(dto: SessionDTO): Session {
	return {
		user: mapUserDTO(dto.user),
		accessToken: dto.access_token,
		refreshToken: dto.refresh_token,
		expiresAt: dto.expires_at,
	};
}
