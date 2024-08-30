import { Button } from "../ui/button";
import SetupHeading from "./SetupHeading";

export default function SetupScreen3() {
  return (
    <main>
      <SetupHeading />

      <div>Please confirm your children's information</div>

      <section>
        <p>First Child</p>
        <div>Name</div>
        <div>Birthday</div>
        <div>Age</div>
        <div>Email</div>
      </section>

      <Button>Confirm</Button>
    </main>
  );
}
