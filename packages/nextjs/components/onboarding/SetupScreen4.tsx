import { Button } from "../ui/button";
import SetupHeading from "./SetupHeading";

export default function SetupScreenComplete() {
  return (
    <main>
      <SetupHeading />

      <section>
        <div>All Setup!</div>

        <p>We have sent an email to your children with a link to access their accounts. Please check your inbox.</p>
      </section>

      <Button>Finish</Button>
    </main>
  );
}
