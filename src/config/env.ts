interface EnvConfig {
  googleFormUrl: string;
}

const env: EnvConfig = {
  googleFormUrl: import.meta.env.VITE_GOOGLE_FORM_URL || 'https://forms.google.com/your-form-id',
};

export default env;
