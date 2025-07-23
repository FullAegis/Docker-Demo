export interface UserProfile {
  id: string; // Or number, depending on API
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  // Add other relevant user profile fields if known
}
