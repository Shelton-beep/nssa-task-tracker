import { Button } from "@/components/ui/button";

const OrganizationIdPage = () => {
  return (
    <div>
      <form action={"/"}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default OrganizationIdPage;
