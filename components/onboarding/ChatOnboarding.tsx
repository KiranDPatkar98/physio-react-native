import { colors } from "@/constants/colors";
import OnboardingService, {
  FlowQuestion,
  OnboardingFlow,
  QuestionOption,
} from "@/services/OnboardingService";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// Types for chat flow
interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface ChatOnboardingProps {
  onComplete: (data: Record<string, any>) => void;
}

export default function ChatOnboarding({ onComplete }: ChatOnboardingProps) {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("welcome");
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});
  const [flow, setFlow] = useState<OnboardingFlow>({});
  const [isLoading, setIsLoading] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);

  // Load onboarding flow from backend
  useEffect(() => {
    const loadFlow = async () => {
      try {
        const flowData = await OnboardingService.getOnboardingFlow();
        setFlow(flowData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load onboarding flow:", error);
        setIsLoading(false);
      }
    };

    loadFlow();
  }, []);

  // Simulate typing delay for bot messages
  const addBotMessage = (content: string, delay: number = 1000) => {
    setIsTyping(true);

    setTimeout(() => {
      // Replace placeholders with actual data
      let processedContent = content;
      Object.keys(onboardingData).forEach((key) => {
        processedContent = processedContent.replace(
          new RegExp(`{${key}}`, "g"),
          onboardingData[key] || "",
        );
      });

      const message: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content: processedContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message]);
      setIsTyping(false);

      // Auto scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const shouldShowQuestion = (question: FlowQuestion): boolean => {
    // Check conditional display logic
    if (question.conditionalDisplay) {
      const { field, condition, value } = question.conditionalDisplay;
      const fieldValue = onboardingData[field];

      if (condition === "not_equals") {
        return !value.includes(fieldValue);
      }
      // Add more conditional logic as needed
    }

    return true;
  };

  const processQuestion = (questionId: string) => {
    const question = flow[questionId];
    if (!question) return;

    // Check if question should be displayed based on conditions
    if (!shouldShowQuestion(question)) {
      // Skip to next question
      if (question.nextQuestion) {
        setCurrentQuestion(question.nextQuestion as string);
      }
      return;
    }

    if (question.type === "message") {
      addBotMessage(question.content, question.delay || 1000);

      // Auto-proceed to next question after message
      if (question.nextQuestion) {
        setTimeout(
          () => {
            setCurrentQuestion(question.nextQuestion as string);
          },
          (question.delay || 1000) + 1000,
        );
      } else {
        // Flow completed - submit data to backend
        setTimeout(async () => {
          const success =
            await OnboardingService.submitOnboardingData(onboardingData);
          if (success) {
            console.log("Onboarding data submitted successfully");
          }
          onComplete(onboardingData);
        }, 1500);
      }
    } else {
      addBotMessage(question.content);
    }
  };

  const validateInput = (
    question: FlowQuestion,
    value: string,
  ): string | null => {
    if (!question.validation) return null;

    if (question.validation.required && !value.trim()) {
      return "This field is required. Please try again! 😊";
    }

    if (question.inputType === "number") {
      const num = parseInt(value);
      if (isNaN(num)) {
        return "Please enter a valid number.";
      }
      if (question.validation.min && num < question.validation.min) {
        return `Please enter a number greater than ${question.validation.min}.`;
      }
      if (question.validation.max && num > question.validation.max) {
        return `Please enter a number less than ${question.validation.max}.`;
      }
    }

    if (
      question.validation.minLength &&
      value.length < question.validation.minLength
    ) {
      return `Please enter at least ${question.validation.minLength} characters.`;
    }

    if (
      question.validation.maxLength &&
      value.length > question.validation.maxLength
    ) {
      return `Please keep it under ${question.validation.maxLength} characters.`;
    }

    return null;
  };

  const handleTextInput = () => {
    const question = flow[currentQuestion];
    if (!inputValue.trim()) return;

    // Validate input
    const validationError = validateInput(question, inputValue);
    if (validationError) {
      addBotMessage(validationError, 500);
      return;
    }

    // Add user message and update data
    addUserMessage(inputValue);
    setOnboardingData((prev) => ({ ...prev, [currentQuestion]: inputValue }));
    setInputValue("");

    // Move to next question
    if (question.nextQuestion) {
      setTimeout(() => {
        setCurrentQuestion(question.nextQuestion as string);
      }, 500);
    }
  };

  const handleChoice = (option: QuestionOption) => {
    const question = flow[currentQuestion];

    if (question.type === "multi-choice") {
      // Handle multi-select
      let newSelected = [...selectedOptions];

      // Check if this is an exclusive option (like "None")
      if (option.exclusive) {
        newSelected = [option.value];
      } else {
        // Remove exclusive options if selecting a non-exclusive option
        newSelected = newSelected.filter((value) => {
          const opt = question.options?.find((o) => o.value === value);
          return !opt?.exclusive;
        });

        // Toggle selection
        if (newSelected.includes(option.value)) {
          newSelected = newSelected.filter((v) => v !== option.value);
        } else {
          newSelected.push(option.value);
        }
      }

      setSelectedOptions(newSelected);
      return;
    }

    // Single choice
    addUserMessage(option.label);
    setOnboardingData((prev) => ({ ...prev, [currentQuestion]: option.value }));

    // Move to next question
    if (question.nextQuestion) {
      setTimeout(() => {
        setCurrentQuestion(question.nextQuestion as string);
      }, 500);
    }
  };

  const handleMultiChoiceSubmit = () => {
    const question = flow[currentQuestion];

    // Validate minimum selections
    if (
      question.minSelections &&
      selectedOptions.length < question.minSelections
    ) {
      addBotMessage(
        `Please select at least ${question.minSelections} option(s).`,
        500,
      );
      return;
    }

    if (selectedOptions.length === 0) {
      addBotMessage(
        "Please select at least one option before continuing.",
        500,
      );
      return;
    }

    const labels = selectedOptions
      .map(
        (value) => question.options?.find((opt) => opt.value === value)?.label,
      )
      .filter(Boolean);

    addUserMessage(labels.join(", "));
    setOnboardingData((prev) => ({
      ...prev,
      [currentQuestion]: selectedOptions,
    }));
    setSelectedOptions([]);

    // Move to next question
    if (question.nextQuestion) {
      setTimeout(() => {
        setCurrentQuestion(question.nextQuestion as string);
      }, 500);
    }
  };

  // Initialize first question
  useEffect(() => {
    if (!isLoading && currentQuestion && flow[currentQuestion]) {
      processQuestion(currentQuestion);
    }
  }, [currentQuestion, isLoading, flow]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>
          Loading your personalized setup...
        </Text>
      </SafeAreaView>
    );
  }

  const renderMessage = (message: ChatMessage) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.type === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.type === "user" ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.type === "user" ? styles.userText : styles.botText,
          ]}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );

  const renderInputArea = () => {
    const question = flow[currentQuestion];
    if (!question || question.type === "message") return null;

    if (question.type === "input") {
      return (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={question.placeholder || "Type your answer..."}
            placeholderTextColor={colors.textMuted}
            keyboardType={
              question.inputType === "number" ? "numeric" : "default"
            }
            onSubmitEditing={handleTextInput}
            autoFocus
            multiline={false}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputValue.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleTextInput}
            disabled={!inputValue.trim()}
          >
            <Ionicons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      );
    }

    if (question.type === "choice" || question.type === "multi-choice") {
      return (
        <View style={styles.choicesContainer}>
          <ScrollView
            style={styles.choicesScrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {question.options?.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.choiceButton,
                  question.type === "multi-choice" &&
                    selectedOptions.includes(option.value) &&
                    styles.choiceSelected,
                ]}
                onPress={() => handleChoice(option)}
                activeOpacity={0.8}
              >
                <View style={styles.choiceContent}>
                  <Text
                    style={[
                      styles.choiceText,
                      question.type === "multi-choice" &&
                        selectedOptions.includes(option.value) &&
                        styles.choiceSelectedText,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text
                      style={[
                        styles.choiceDescription,
                        question.type === "multi-choice" &&
                          selectedOptions.includes(option.value) &&
                          styles.choiceSelectedDescription,
                      ]}
                    >
                      {option.description}
                    </Text>
                  )}
                </View>
                {question.type === "multi-choice" &&
                  selectedOptions.includes(option.value) && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.white}
                    />
                  )}
                {question.type === "choice" && (
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.textMuted}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {question.type === "multi-choice" && selectedOptions.length > 0 && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleMultiChoiceSubmit}
            >
              <Text style={styles.submitButtonText}>
                Continue ({selectedOptions.length} selected)
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AI</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>Physio Helper</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.progressText}>
              {Object.keys(onboardingData).length} questions answered
            </Text>
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(renderMessage)}

          {isTyping && (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <View style={styles.typingIndicator}>
                  <ActivityIndicator size="small" color={colors.textMuted} />
                  <Text style={styles.typingText}>AI is typing...</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={[styles.inputAreaContainer, { paddingBottom: Math.max(insets.bottom - 10, 0) }]}>{renderInputArea()}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  progressText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    marginVertical: 4,
  },
  botMessage: {
    alignItems: "flex-start",
  },
  userMessage: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  botBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: colors.textPrimary,
  },
  userText: {
    color: colors.white,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typingText: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: "italic",
  },
  inputAreaContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 4,
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.input,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 15,
    color: colors.textPrimary,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  choicesContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 0,
    maxHeight: 300,
  },
  choicesScrollView: {
    maxHeight: 250,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 6,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  choiceSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  choiceContent: {
    flex: 1,
    paddingRight: 8,
  },
  choiceText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
    lineHeight: 22,
  },
  choiceDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  choiceSelectedText: {
    color: colors.white,
    fontWeight: "600",
  },
  choiceSelectedDescription: {
    color: colors.white,
    opacity: 0.9,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 0,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
