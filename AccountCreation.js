// ============================================================
// forms.js — JS translation of forms.py (Django → React)
// ============================================================
// Mirrors the structure of the Django forms exactly:
//   BaseSignUpForm, StudentSignUpForm, TeacherSignUpForm,
//   ParentSignUpForm, StyledAuthenticationForm,
//   ForgotUsernameForm, TeacherInformationForm,
//   StudentInformationForm
//
// Each class exposes:
//   - fields        : field definitions (label, type, attrs)
//   - validate(data): runs all clean_* logic, returns { errors, cleaned }
//   - save(data)    : returns the shaped user/model object (no DB calls)
// ============================================================

// ------------------------------------
// Shared helpers
// ------------------------------------


// (I don't think this is needed for the Student's Writing Site as we aren't 
//  dividing things by grade level)
const GRADE_CHOICES = [
  { value: "",   label: "Select your grade" },
  { value: 3,    label: "Grade 3" },
  { value: 4,    label: "Grade 4" },
  { value: 5,    label: "Grade 5" },
  { value: 6,    label: "Grade 6" },
  { value: 7,    label: "Grade 7" },
  { value: 8,    label: "Grade 8" },
  { value: 10,   label: "SHSAT" },
  { value: 11,   label: "SAT" },
];

const AUTH_INPUT_ATTRS = { className: "form-control auth-input" };

// Simulates Django's User.objects.filter(email__iexact=email).exists()
// Replace with your actual async API call.
async function emailExists(email) {
  // Example: return await api.get(`/check-email/?email=${email}`).then(r => r.exists);
  return false;
}


// ============================================================
// BaseSignUpForm
// Mirrors: BaseSignUpForm(UserCreationForm)
// ============================================================
export class BaseSignUpForm {
  fields = {
    username: {
      label: "Username",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Username" },
    },
    email: {
      label: "Email",
      type: "email",
      required: true,
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Email" },
    },
    password1: {
      label: "Password",
      type: "password",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Password" },
    },
    password2: {
      label: "Confirm Password",
      type: "password",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Confirm Password" },
    },
  };

  // Mirrors: clean_email()
  async cleanEmail(email) {
    const cleaned = (email || "").trim().toLowerCase();
    if (!cleaned) throw new Error("Email is required.");
    const exists = await emailExists(cleaned);
    if (exists) throw new Error("An account with this email already exists.");
    return cleaned;
  }

  // Mirrors: clean() — password match check (equivalent of UserCreationForm)
  cleanPasswords(password1, password2) {
    if (!password1) throw new Error("Password is required.");
    if (password1 !== password2) throw new Error("Passwords do not match.");
    return password1;
  }

  async validate(data) {
    const errors = {};
    const cleaned = {};

    if (!data.username?.trim()) {
      errors.username = "Username is required.";
    } else {
      cleaned.username = data.username.trim();
    }

    try {
      cleaned.email = await this.cleanEmail(data.email);
    } catch (e) {
      errors.email = e.message;
    }

    try {
      cleaned.password = this.cleanPasswords(data.password1, data.password2);
    } catch (e) {
      errors.password1 = e.message;
    }

    return { errors, cleaned };
  }
}


// ============================================================
// StudentSignUpForm
// Mirrors: StudentSignUpForm(BaseSignUpForm)
// ============================================================
export class StudentSignUpForm extends BaseSignUpForm {
  fields = {
    ...super.fields,  // Note: in practice, spread the parent fields manually (see below)
    grade: {
      label: "Grade",
      type: "select",
      required: false,
      choices: GRADE_CHOICES,
      attrs: { ...AUTH_INPUT_ATTRS },
    },
  };

  async validate(data) {
    const result = await super.validate(data);
    return result; // grade has no extra validation beyond optional
  }

  // Mirrors: save()
  // Returns a plain object shaped like the Django User model after save()
  save(cleanedData) {
    const grade = cleanedData.grade;
    return {
      username:      cleanedData.username,
      email:         cleanedData.email,
      password:      cleanedData.password,
      role:          "student",
      is_active:     false,
      email_verified: false,
      grade:         (grade !== undefined && grade !== "" && grade !== null)
                       ? parseInt(grade, 10)
                       : null,
    };
  }
}


// ============================================================
// TeacherSignUpForm
// Mirrors: TeacherSignUpForm(BaseSignUpForm)
// ============================================================

// Replace with your actual env/config value
const TEACHER_SIGNUP_CODE = process.env.REACT_APP_TEACHER_SIGNUP_CODE || "";

export class TeacherSignUpForm extends BaseSignUpForm {
  fields = {
    ...super.fields,
    teacher_access_code: {
      label: "Teacher access code",
      type: "password",
      maxLength: 100,
      helpText: "Required for teacher account creation.",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Teacher access code" },
    },
  };

  // Mirrors: clean_teacher_access_code()
  cleanTeacherAccessCode(code) {
    const cleaned = (code || "").trim();
    if (!TEACHER_SIGNUP_CODE || cleaned !== TEACHER_SIGNUP_CODE) {
      throw new Error("Teacher access code is not valid.");
    }
    return cleaned;
  }

  async validate(data) {
    const result = await super.validate(data);

    try {
      result.cleaned.teacher_access_code = this.cleanTeacherAccessCode(data.teacher_access_code);
    } catch (e) {
      result.errors.teacher_access_code = e.message;
    }

    return result;
  }

  // Mirrors: save()
  save(cleanedData) {
    return {
      username:       cleanedData.username,
      email:          cleanedData.email,
      password:       cleanedData.password,
      role:           "teacher",
      is_active:      false,
      email_verified: false,
      is_staff:       false,
      is_superuser:   false,
    };
  }
}


// ============================================================
// ParentSignUpForm
// Mirrors: ParentSignUpForm(BaseSignUpForm)
// ============================================================
export class ParentSignUpForm extends BaseSignUpForm {
  fields = {
    ...super.fields,
    relationship: {
      label: "Relationship",
      type: "text",
      maxLength: 50,
      required: false,
      helpText: "e.g., Mother, Father, Guardian",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Relationship" },
    },
  };

  async validate(data) {
    return await super.validate(data);
    // relationship has no extra validation
  }

  // Mirrors: save()
  // Note: _relationship mirrors Django's user._relationship = ...
  save(cleanedData) {
    return {
      username:       cleanedData.username,
      email:          cleanedData.email,
      password:       cleanedData.password,
      role:           "parent",
      is_active:      false,
      email_verified: false,
      _relationship:  cleanedData.relationship || null, // used later if they link a child
    };
  }
}


// ============================================================
// StyledAuthenticationForm
// Mirrors: StyledAuthenticationForm(AuthenticationForm)
// ============================================================
export class StyledAuthenticationForm {
  fields = {
    username: {
      label: "Username",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Username" },
    },
    password: {
      label: "Password",
      type: "password",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Password" },
    },
  };

  validate(data) {
    const errors = {};
    const cleaned = {};

    if (!data.username?.trim()) errors.username = "Username is required.";
    else cleaned.username = data.username.trim();

    if (!data.password) errors.password = "Password is required.";
    else cleaned.password = data.password;

    return { errors, cleaned };
  }
}


// ============================================================
// ForgotUsernameForm
// Mirrors: ForgotUsernameForm(forms.Form)
// ============================================================
export class ForgotUsernameForm {
  fields = {
    email: {
      label: "Email",
      type: "email",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Email" },
    },
  };

  validate(data) {
    const errors = {};
    const cleaned = {};

    const email = (data.email || "").trim().toLowerCase();
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    } else {
      cleaned.email = email;
    }

    return { errors, cleaned };
  }
}


// ============================================================
// TeacherInformationForm
// Mirrors: TeacherInformationForm(ModelForm) — model: TeacherInformation
// ============================================================
export class TeacherInformationForm {
  fields = {
    full_name: {
      label: "Full Name",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Full Name" },
    },
    school_name: {
      label: "School Name",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "School Name" },
    },
    school_email: {
      label: "School Email",
      type: "email",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "School Email" },
    },
    phone_number: {
      label: "Phone Number",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Phone Number" },
    },
    subjects_taught: {
      label: "Subjects Taught",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Subjects Taught" },
    },
  };

  validate(data) {
    const errors = {};
    const cleaned = {};

    for (const name of Object.keys(this.fields)) {
      const val = (data[name] || "").trim();
      cleaned[name] = val || null;
    }

    return { errors, cleaned };
  }
}


// ============================================================
// StudentInformationForm
// Mirrors: StudentInformationForm(ModelForm) — model: StudentInformation
// ============================================================
export class StudentInformationForm {
  fields = {
    student_name: {
      label: "Student Name",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Student Name" },
    },
    student_grade: {
      label: "Student Grade",
      type: "select",
      required: false,
      choices: [
        { value: "",  label: "Select student grade" },
        { value: 3,   label: "Grade 3" },
        { value: 4,   label: "Grade 4" },
        { value: 5,   label: "Grade 5" },
        { value: 6,   label: "Grade 6" },
        { value: 7,   label: "Grade 7" },
        { value: 8,   label: "Grade 8" },
        { value: 10,  label: "SHSAT" },
        { value: 11,  label: "SAT" },
      ],
      attrs: { ...AUTH_INPUT_ATTRS },
    },
    student_school: {
      label: "Student School",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Student School" },
    },
    guardian_name: {
      label: "Guardian Name",
      type: "text",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Guardian Name" },
    },
    guardian_email: {
      label: "Guardian Email",
      type: "email",
      attrs: { ...AUTH_INPUT_ATTRS, placeholder: "Guardian Email" },
    },
    learning_notes: {
      label: "Learning Notes",
      type: "textarea",
      attrs: {
        ...AUTH_INPUT_ATTRS,
        placeholder: "Learning notes",
        rows: 4,
      },
    },
  };

  // Mirrors: clean_student_grade()
  cleanStudentGrade(grade) {
    if (grade === null || grade === undefined || grade === "") return null;
    return parseInt(grade, 10);
  }

  validate(data) {
    const errors = {};
    const cleaned = {};

    for (const name of Object.keys(this.fields)) {
      if (name === "student_grade") continue;
      cleaned[name] = (data[name] || "").trim() || null;
    }

    cleaned.student_grade = this.cleanStudentGrade(data.student_grade);

    return { errors, cleaned };
  }
}