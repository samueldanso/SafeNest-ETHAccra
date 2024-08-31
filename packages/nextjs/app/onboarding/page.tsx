import SetupScreen1 from "~~/components/onboarding/SetupScreen1";
import SetupScreen2 from "~~/components/onboarding/SetupScreen2";
import SetupScreen3 from "~~/components/onboarding/SetupScreen3";
import SetupScreenComplete from "~~/components/onboarding/SetupScreen4";

export default function OnboardingPage() {
  return (
    <main>
      <SetupScreen1 />
      <SetupScreen2 />
      <SetupScreen3 />
      <SetupScreenComplete />
    </main>
  );
}
