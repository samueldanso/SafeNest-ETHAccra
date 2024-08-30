import { Button } from "../ui/button";
import SetupHeading from "./SetupHeading";

export default function SetupScreen1() {
  return (
    <main>
      <SetupHeading />

      <section>
        <div>How many children do you have?</div>

        <input placeholder="2" type="number" />
      </section>

      <Button>Continue</Button>
    </main>
  );
}
