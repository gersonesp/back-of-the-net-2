export const setButtonStyle = (buttonType, darkMode, buttonDisabled) => {
  if (darkMode && buttonDisabled) {
    return `${buttonType} disabled dark`;
  } else if (buttonDisabled) {
    return `${buttonType} disabled`;
  } else {
    return buttonType;
  }
};
