interface EnvConfig {
  googleFormUrl: string;
}

const env: EnvConfig = {
  googleFormUrl: process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || 'https://forms.google.com/your-form-id',
};

export default env;
