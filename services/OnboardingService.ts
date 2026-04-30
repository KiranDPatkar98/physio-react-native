// services/OnboardingService.ts
export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  exclusive?: boolean;
}

export interface FlowQuestion {
  id: string;
  type: 'message' | 'input' | 'choice' | 'multi-choice';
  content: string;
  inputType?: 'text' | 'number';
  placeholder?: string;
  delay?: number;
  options?: QuestionOption[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  conditionalDisplay?: {
    field: string;
    condition: 'equals' | 'not_equals' | 'contains' | 'not_contains';
    value: any;
  };
  minSelections?: number;
  maxSelections?: number;
  nextQuestion?: string | ((answer: string) => string);
}

export interface OnboardingFlow {
  [key: string]: FlowQuestion;
}

class OnboardingService {
  private baseUrl = 'your-api-base-url'; // Replace with your actual API URL

  /**
   * Fetch onboarding flow configuration from backend
   */
  async getOnboardingFlow(): Promise<OnboardingFlow> {
    try {
      const response = await fetch(`${this.baseUrl}/onboarding/flow`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding flow');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching onboarding flow:', error);
      
      // Return default flow as fallback
      return this.getDefaultFlow();
    }
  }

  /**
   * Submit completed onboarding data to backend
   */
  async submitOnboardingData(data: Record<string, any>): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/onboarding/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          onboardingData: data,
          completedAt: new Date().toISOString(),
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      return false;
    }
  }

  /**
   * Get user's previous onboarding responses (for editing/reviewing)
   */
  async getUserOnboardingData(userId: string): Promise<Record<string, any> | null> {
    try {
      const response = await fetch(`${this.baseUrl}/onboarding/user/${userId}`);
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user onboarding data:', error);
      return null;
    }
  }

  /**
   * Default/fallback flow configuration
   */
  private getDefaultFlow(): OnboardingFlow {
    return {
      welcome: {
        id: 'welcome',
        type: 'message',
        content: "Hi there! 👋 I'm your AI physio assistant. I'm here to help you on your recovery journey!",
        nextQuestion: 'name'
      },
      name: {
        id: 'name',
        type: 'input',
        content: "Let's start with the basics - what should I call you?",
        inputType: 'text',
        validation: { required: true },
        nextQuestion: 'name_response'
      },
      name_response: {
        id: 'name_response',
        type: 'message',
        content: "Nice to meet you, {name}! 😊 I'm excited to help you on your wellness journey.",
        nextQuestion: 'date_of_birth'
      },
      date_of_birth: {
        id: 'date_of_birth',
        type: 'input',
        content: "What's your date of birth? Please enter in DD/MM/YYYY format (e.g., 15/03/1990)",
        inputType: 'text',
        placeholder: 'DD/MM/YYYY',
        validation: { required: true, minLength: 8, maxLength: 10 },
        nextQuestion: 'dob_response'
      },
      dob_response: {
        id: 'dob_response',
        type: 'message',
        content: "Perfect! Now let me learn about your work routine...",
        nextQuestion: 'work_mode'
      },
      work_mode: {
        id: 'work_mode',
        type: 'choice',
        content: "How do you primarily spend your work day?",
        options: [
          { id: 'desk', label: 'Mostly at a desk/computer 💻', value: 'desk' },
          { id: 'standing', label: 'Mostly standing/moving 🚶', value: 'standing' },
          { id: 'physical', label: 'Physical/manual work 💪', value: 'physical' },
          { id: 'mixed', label: 'Mix of sitting and moving ⚖️', value: 'mixed' }
        ],
        nextQuestion: 'sitting_hours'
      },
      sitting_hours: {
        id: 'sitting_hours',
        type: 'choice',
        content: "On average, how many hours do you sit per day?",
        options: [
          { id: 'low', label: 'Less than 4 hours ⏱️', value: '<4' },
          { id: 'medium', label: '4-8 hours 🕐', value: '4-8' },
          { id: 'high', label: 'More than 8 hours ⏰', value: '>8' }
        ],
        nextQuestion: 'pain_check'
      },
      pain_check: {
        id: 'pain_check',
        type: 'message',
        content: "Got it! Now, let's talk about any discomfort you might be experiencing...",
        nextQuestion: 'pain_areas'
      },
      pain_areas: {
        id: 'pain_areas',
        type: 'multi-choice',
        content: "Which areas do you experience pain or discomfort? (Select all that apply)",
        options: [
          { id: 'neck', label: 'Neck 🦒', value: 'neck' },
          { id: 'shoulders', label: 'Shoulders 💪', value: 'shoulders' },
          { id: 'upper_back', label: 'Upper Back ⬆️', value: 'upper_back' },
          { id: 'lower_back', label: 'Lower Back ⬇️', value: 'lower_back' },
          { id: 'wrists', label: 'Wrists/Hands ✋', value: 'wrists' },
          { id: 'hips', label: 'Hips 🦴', value: 'hips' },
          { id: 'none', label: 'No pain currently ✅', value: 'none', exclusive: true }
        ],
        nextQuestion: 'frequency'
      },
      frequency: {
        id: 'frequency',
        type: 'choice',
        content: "How often do you experience this discomfort?",
        options: [
          { id: 'daily', label: 'Daily 📅', value: 'daily' },
          { id: 'few_times_week', label: 'Few times a week 📆', value: 'few_times_week' },
          { id: 'weekly', label: 'Weekly 🗓️', value: 'weekly' },
          { id: 'occasionally', label: 'Occasionally ⏲️', value: 'occasionally' }
        ],
        nextQuestion: 'completion'
      },
      completion: {
        id: 'completion',
        type: 'message',
        content: "Awesome! 🎉 I have everything I need to create your personalized physio plan. Welcome to Physio Connect!",
        nextQuestion: null
      }
    };
  }
}

export default new OnboardingService();