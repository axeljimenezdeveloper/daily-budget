export const FIELD_STATE_COLORS = {
  normal: "secondary", 
  error: "error",
  success: "success",
  warning: "warning",
  disabled: "secondary",
};

export const getLabelColor = (
  error?: string,
  disabled?: boolean
): string => {
  if (disabled) return "secondary";
  if (error) return "error";
  return "secondary";
};

export const formatErrorText = (error: string): string => error;
export const formatHelperText = (helper: string): string => helper;