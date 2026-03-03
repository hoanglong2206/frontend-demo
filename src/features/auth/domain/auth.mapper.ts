import type { Session, User } from "./auth.types";
import type { SessionDTO, UserDTO } from "../api/auth.api.type";
import { asISODate, asID } from "@/shared/types/common.type";

export function mapUserDTO(dto: UserDTO): User {
	return {
		id: asID(dto.id),
		email: dto.email,
		isVerified: dto.is_verified,
		isActive: dto.is_active,
		createdAt: asISODate(dto.created_at),
		updatedAt: asISODate(dto.updated_at),
	};
}

export function mapSessionDTO(dto: SessionDTO): Session {
	return {
		accessToken: dto.access_token,
		refreshToken: dto.refresh_token,
		expiresAt: dto.expires_at,
	};
}
