import { Button } from "../ui/button";
import SetupHeading from "./SetupHeading";

export default function SetupScreen2() {
  return (
    <main>
      <SetupHeading />

      <section>
        <div> Can you tell us a bit more about your children?</div>

        <div>Name</div>
        <input placeholder="Jane Doe" type="text" />

        <div>Birthday</div>
        <input placeholder="01/01/2010" type="date" />

        <div>Name</div>
        <input placeholder="janedoe@gmail.com" type="email" />
      </section>

      <Button>Continue</Button>
    </main>
  );
}
