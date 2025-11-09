// --- path: src/components/common/InputBox.tsx
import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputKeyPressEventData,
} from 'react-native';

export type InputKind =
  | 'text' // free text
  | 'password' // obscured text with optional toggle
  | 'number' // integers only
  | 'decimal' // decimal numbers
  | 'email' // email input
  | 'tel' // phone number
  | 'search'; // search field

export type IconRenderProp =
  | React.ReactNode
  | ((focused: boolean, hasError: boolean) => React.ReactNode);

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;

  placeholder?: string;
  label?: string;
  helperText?: string; // non-error helper/caption below input
  errorText?: string; // when present, component enters error state and shows this below
  disabled?: boolean;
  editable?: boolean; // defaults to !disabled when undefined
  autoFocus?: boolean;

  // InputBox configuration
  kind?: InputKind;
  maxLength?: number;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;

  // Icons & actions
  leftIcon?: IconRenderProp;
  rightIcon?: IconRenderProp; // If kind==='password' and no rightIcon provided, an eye/eye-off text button is shown
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;

  // Styling hooks
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  errorTextStyle?: TextStyle;
  leftIconContainerStyle?: ViewStyle;
  rightIconContainerStyle?: ViewStyle;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;

  // Misc
  testID?: string;
  accessibilityLabel?: string;
}

export type InputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

const onlyDigits = (s: string) => s.replace(/\D+/g, '');
const onlyNumericWithDecimal = (s: string) => s.replace(/[^0-9.]+/g, '');

const InputBox = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    value,
    onChangeText,
    placeholder,
    label,
    helperText,
    errorText,
    disabled,
    editable,
    autoFocus,

    kind = 'text',
    maxLength,
    returnKeyType,
    autoCapitalize = 'none',
    autoCorrect = false,

    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,

    containerStyle,
    inputStyle,
    labelStyle,
    helperTextStyle,
    errorTextStyle,
    leftIconContainerStyle,
    rightIconContainerStyle,
    onSubmitEditing,
    onKeyPress,

    testID,
    accessibilityLabel,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const computedEditable = editable ?? !disabled;
  const hasError = !!errorText;

  // Map `kind` to RN input settings
  const { keyboardType, inputMode, secureTextEntry, autoComplete } =
    useMemo(() => {
      switch (kind) {
        case 'password':
          return {
            keyboardType: 'default' as const,
            inputMode: 'text' as const,
            secureTextEntry: !showPassword,
            autoComplete: 'password',
          };
        case 'number':
          return {
            keyboardType: 'number-pad' as const,
            inputMode: 'numeric' as const,
            secureTextEntry: false,
            autoComplete: 'off',
          };
        case 'decimal':
          return {
            keyboardType: 'decimal-pad' as const,
            inputMode: 'decimal' as const,
            secureTextEntry: false,
            autoComplete: 'off',
          };
        case 'email':
          return {
            keyboardType: 'email-address' as const,
            inputMode: 'email' as const,
            secureTextEntry: false,
            autoComplete: 'email',
          };
        case 'tel':
          return {
            keyboardType: 'phone-pad' as const,
            inputMode: 'tel' as const,
            secureTextEntry: false,
            autoComplete: 'tel',
          };
        case 'search':
          return {
            keyboardType: 'default' as const,
            inputMode: 'search' as const,
            secureTextEntry: false,
            autoComplete: 'off',
          };
        default:
          return {
            keyboardType: 'default' as const,
            inputMode: 'text' as const,
            secureTextEntry: false,
            autoComplete: 'off',
          };
      }
    }, [kind, showPassword]);

  // Expose imperative handles
  const inputRef = React.useRef<TextInput>(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear?.(),
  }));

  // Sanitise numeric input (optional but helpful for number/decimal kinds)
  const handleChangeText = (t: string) => {
    let next = t;
    if (kind === 'number') next = onlyDigits(t);
    if (kind === 'decimal') next = onlyNumericWithDecimal(t);
    onChangeText(next);
  };

  const renderIcon = (icon: IconRenderProp) => {
    if (!icon) return null;
    if (typeof icon === 'function') return icon(isFocused, hasError);
    return icon;
  };

  const showDefaultPasswordToggle = kind === 'password' && !rightIcon;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {!!label && (
        <Text
          style={[
            styles.label,
            hasError && { color: stylesVars.error },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: stylesVars.primary },
          hasError && { borderColor: stylesVars.error },
          disabled && { opacity: 0.6 },
        ]}
      >
        {/* Left icon */}
        {(leftIcon || onLeftIconPress) && (
          <Pressable
            accessibilityRole={onLeftIconPress ? 'button' : undefined}
            accessibilityLabel={
              accessibilityLabel ? `${accessibilityLabel}-left-icon` : undefined
            }
            style={[styles.iconContainer, leftIconContainerStyle]}
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
            hitSlop={8}
          >
            {renderIcon(leftIcon)}
          </Pressable>
        )}

        <TextInput
          ref={inputRef}
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={stylesVars.placeholder}
          editable={computedEditable}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          inputMode={inputMode as any}
          secureTextEntry={secureTextEntry}
          autoComplete={autoComplete as any}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onSubmitEditing={onSubmitEditing}
          onKeyPress={onKeyPress}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
        />

        {/* Right icon or default password toggle */}
        {showDefaultPasswordToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              accessibilityLabel
                ? `${accessibilityLabel}-toggle-visibility`
                : 'Toggle password visibility'
            }
            style={[styles.iconContainer, rightIconContainerStyle]}
            onPress={() => setShowPassword(s => !s)}
            hitSlop={8}
          >
            <Text
              style={[
                styles.toggleText,
                hasError && { color: stylesVars.error },
              ]}
            >
              {' '}
              {showPassword ? 'Hide' : 'Show'}{' '}
            </Text>
          </Pressable>
        ) : rightIcon || onRightIconPress ? (
          <Pressable
            accessibilityRole={onRightIconPress ? 'button' : undefined}
            accessibilityLabel={
              accessibilityLabel
                ? `${accessibilityLabel}-right-icon`
                : undefined
            }
            style={[styles.iconContainer, rightIconContainerStyle]}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={8}
          >
            {renderIcon(rightIcon)}
          </Pressable>
        ) : null}
      </View>

      {/* Helper & Error messages */}
      {hasError ? (
        <Text
          style={[styles.errorText, errorTextStyle]}
          accessibilityLiveRegion="polite"
        >
          {errorText}
        </Text>
      ) : helperText ? (
        <Text style={[styles.helperText, helperTextStyle]}>{helperText}</Text>
      ) : null}
    </View>
  );
});

const stylesVars = {
  border: '#D4D4D8',
  primary: '#3B82F6',
  error: '#EF4444',
  text: '#111827',
  placeholder: '#9CA3AF',
  caption: '#6B7280',
  surface: '#FFFFFF',
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: stylesVars.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: stylesVars.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: stylesVars.surface,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: stylesVars.text,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: stylesVars.caption,
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: stylesVars.caption,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: stylesVars.error,
  },
});

export default InputBox;
