export const ERRORS = {
  invalidEmail: "כתובת אימייל שגויה",
  requiredField: "זהו שדה חובה",
  wrongPasswordOrEmail: "אימייל או סיסמה שגויים",
  emailAlreadyInUse: "האימייל כבר בשימוש",
  global: "התרחשה שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר",
};

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
