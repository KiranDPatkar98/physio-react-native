import AsyncStorage from '@react-native-async-storage/async-storage';

class OnboardingStatusService {
  private static readonly ONBOARDING_KEY = 'onboarding_completed';
  private static readonly USER_DATA_KEY = 'user_onboarding_data';

  /**
   * Check if user has completed onboarding
   */
  static async isOnboardingCompleted(): Promise<boolean> {
    try {
      const completed = await AsyncStorage.getItem(this.ONBOARDING_KEY);
      return completed === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  /**
   * Mark onboarding as completed
   */
  static async markOnboardingCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.ONBOARDING_KEY, 'true');
    } catch (error) {
      console.error('Error marking onboarding completed:', error);
    }
  }

  /**
   * Save user onboarding data
   */
  static async saveUserData(data: Record<string, any>): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  /**
   * Get user onboarding data
   */
  static async getUserData(): Promise<Record<string, any> | null> {
    try {
      const data = await AsyncStorage.getItem(this.USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Reset onboarding status (for testing/logout)
   */
  static async resetOnboarding(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([this.ONBOARDING_KEY, this.USER_DATA_KEY]);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  }

  /**
   * Check if user profile is complete
   */
  static async isProfileComplete(): Promise<boolean> {
    try {
      const userData = await this.getUserData();
      if (!userData) return false;

      // Check required fields
      const requiredFields = ['name', 'age', 'work_mode'];
      return requiredFields.every(field => userData[field] && userData[field].toString().trim());
    } catch (error) {
      console.error('Error checking profile completeness:', error);
      return false;
    }
  }
}

export default OnboardingStatusService;